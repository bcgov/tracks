package main

import (
	"archive/zip"
	"bytes"
	"context"
	"database/sql"
	"encoding/csv"
	"flag"
	"fmt"
	_ "github.com/lib/pq"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	_ "github.com/twpayne/go-geom/encoding/ewkb"
	_ "github.com/twpayne/go-geom/encoding/geojson"
	"log"
	"os"
	"strconv"
	"time"
)

// defaults for local development -- override on command line
var (
	databaseUsername string = "tracks"
	databasePassword string = "development_only"
	databaseHost     string = "localhost"
	databaseName     string = "tracks"
	minioEndpoint    string = "localhost"
	minioPort        string = "9000"
	minioUseSSL      bool   = false
	minioAccessKey   string = "ccfc0d5a7a8f589ed8bc65b50a255d64"
	minioSecretKey   string = "7f99fccf96804f9456f05ad8bf926dba"
	bucketName       string = "export"
)

func testMinioConnection(client *minio.Client) error {
	log.Printf("Verifying Minio connection")

	bucketExists, err := client.BucketExists(context.Background(), bucketName)

	if err != nil {
		return err
	}

	if !bucketExists {
		log.Printf("Warning, bucket doesn't exist, creating it\n")
		err = client.MakeBucket(context.Background(), bucketName, minio.MakeBucketOptions{})
		if err != nil {
			return err
		}
	}

	return nil
}

func flagProcessingFailed(db *sql.DB, id int) {
	db.Query(`UPDATE export_request set status = 'ERROR' where id = $1`,
		id)
	// we ignore the potential db error since this is the interesting one anyway
}

func generateReportCSV(db *sql.DB, id int) error {
	buf := new(bytes.Buffer)
	w := csv.NewWriter(buf)

	header := []string {
		"Report ID",
		"Commercial Operator",
		"Reporting Period",
		"Report Date"
	}

	if err := w.Write(header); err != null {
		return err
	}

	w.Flush()

	if err := w.Error(); err != nil {
		return err
	}

	return buf
}

func processEntry(db *sql.DB, client *minio.Client, id int) error {

	tx, err := db.Begin()
	if err != nil {
		flagProcessingFailed(db, id)
		return err
	}
	stmt, err := db.Prepare(`UPDATE export_request set status = 'PROCESSING' where id = $1`)
	if err != nil {
		return err
	}
	defer tx.Rollback()
	stmt.Exec(id)

	var minioId string
	rows, err := db.Query(`SELECT e.minio_identifier as id from export_request e where e.id = $1`, id)
	if err != nil {
		return err
	}

	for rows.Next() {
		if err := rows.Scan(&minioId); err != nil {
			return err
		}
	}

	stmt, err = db.Prepare(`UPDATE export_request set status = 'READY' where id = $1`)
	stmt.Exec(id)

	buf := new(bytes.Buffer)
	w := zip.NewWriter(buf)

	reportFile, err := w.Create("report.csv")
	if err != nil {
		return err
	}
	reportData, err := generateReportCSV(db, id)
	if err != nil {
		return err
	}
	reportFile.Write(reportData)

	err = w.Close()
	if err != nil {
		log.Printf("Error creating zip archive %s\n", err)
		return err
	}

	_, err = client.PutObject(context.Background(), bucketName, minioId, buf, int64(buf.Len()), minio.PutObjectOptions{ContentType: "application/zip"})
	if err != nil {
		log.Printf("Error uploading to Minio %s\n", err)
		return err
	}

	err = tx.Commit()
	if err != nil {
		log.Printf("Error committing transaction %s\n", err)
		return err
	}

	log.Printf("TX COMMIT\n")
	return nil
}

func findAll(db *sql.DB, client *minio.Client) error {
	rows, err := db.Query(`
		SELECT e.id as id from export_request e where e.status = 'PENDING';
	`)
	if err != nil {
		return err
	}

	defer rows.Close()

	for rows.Next() {
		var exportId int
		if err := rows.Scan(&exportId); err != nil {
			return err
		}

		log.Printf("Will now process export id: %+v\n", exportId)

		if err := processEntry(db, client, exportId); err != nil {
			log.Printf("Error processing export %s\n", err)
			return err
		}
	}
	return nil
}

func run() error {
	ds := fmt.Sprintf("postgres://%s:%s@%s/%s?binary_parameters=yes&sslmode=disable", databaseUsername, databasePassword, databaseHost, databaseName)
	ms := fmt.Sprintf("%s:%s", minioEndpoint, minioPort)

	// build db connection
	db, err := sql.Open("postgres", ds)
	if err != nil {
		return err
	}

	defer db.Close()
	log.Printf("Verifying Postgres connection")
	if err := db.Ping(); err != nil {
		return err
	}

	// build minio Connection
	client, err := minio.New(ms,
		&minio.Options{
			Creds:  credentials.NewStaticV4(minioAccessKey, minioSecretKey, ""),
			Secure: minioUseSSL,
			Region: "openshift",
		})

	if err != nil {
		return err
	}

	//test minio Connection
	if err := testMinioConnection(client); err != nil {
		return err
	}

	log.Printf("Waiting for files to process")
	for
	{
		// for now just loop forever. @todo await messages from AMQP
		if err := findAll(db, client); err != nil {
			return err
		}
		time.Sleep(20 * time.Second)
	}
}

func main() {

	flag.StringVar(&databaseUsername, "databaseUsername", EnvironmentOrDefault("DATABASE_USERNAME", databaseUsername), "Data Source Username")
	flag.StringVar(&databasePassword, "databasePassword", EnvironmentOrDefault("DATABASE_PASSWORD", databasePassword), "Data Source Password")
	flag.StringVar(&databaseHost, "databaseHost", EnvironmentOrDefault("DATABASE_HOST", databaseHost), "Data Source Host")
	flag.StringVar(&databaseName, "databaseName", EnvironmentOrDefault("DATABASE_NAME", databaseName), "Database Name")

	flag.StringVar(&minioEndpoint, "minioEndpoint", EnvironmentOrDefault("MINIO_ENDPOINT", minioEndpoint), "Minio Endpoint")
	flag.StringVar(&minioPort, "minioPort", EnvironmentOrDefault("MINIO_PORT", minioPort), "Minio Port")
	flag.BoolVar(&minioUseSSL, "minioUseSSL", EnvironmentOrDefaultBool("MINIO_USE_SSL", minioUseSSL), "Minio Should use SSL")

	flag.StringVar(&minioAccessKey, "minioAccessKey", EnvironmentOrDefault("MINIO_ACCESS_KEY", minioAccessKey), "Minio Access Key")
	flag.StringVar(&minioSecretKey, "minioSecretKey", EnvironmentOrDefault("MINIO_SECRET_KEY", minioSecretKey), "Minio Secret Key")
	flag.StringVar(&bucketName, "minioBucketName", EnvironmentOrDefault("MINIO_BUCKET_NAME", bucketName), "Minio Bucket Name")

	flag.Parse()

	if err := run(); err != nil {
		log.Println(err)
		os.Exit(-1)
	}
}

func EnvironmentOrDefault(key string, defaultValue string) string {
	if val, ok := os.LookupEnv(key); ok {
		return val
	}
	return defaultValue
}

func EnvironmentOrDefaultBool(key string, defaultValue bool) bool {
	if val, ok := os.LookupEnv(key); ok {
		if boolVal, err := strconv.ParseBool(val); err != nil {
			return defaultValue
		} else {
			return boolVal
		}
	}
	return defaultValue
}
