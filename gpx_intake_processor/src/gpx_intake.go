package main

import (
	"context"
	"database/sql"
	"flag"
	"fmt"
	_ "github.com/lib/pq"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	geom "github.com/twpayne/go-geom"
	"github.com/twpayne/go-gpx"
	_ "github.com/twpayne/go-geom/encoding/ewkb"
	"github.com/twpayne/go-geom/encoding/ewkbhex"
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
	bucketName       string = "gpx"
)

func testMinioConnection(client *minio.Client) error {
	log.Printf("Verifying Minio connection")

	bucketExists, err := client.BucketExists(context.Background(), bucketName)

	if err != nil {
		return err
	}

	if !bucketExists {
		log.Printf("Warning, bucket doesn't exist\n")
	}

	return nil
}

func flagProcessingFailed(db *sql.DB, id int) {
	db.Query(`UPDATE travel_path set processing_state = 'FAILED' where id = $1`,
		id)
	// we ignore the potential db error since this is the interesting one anyway
}

func processEntry(db *sql.DB, client *minio.Client, minioIdentifier string, id int) error {

	log.Printf("Downloading file from minio: %+v\n", minioIdentifier)

	response, err := client.GetObject(context.Background(), bucketName, minioIdentifier, minio.GetObjectOptions{})
	if err != nil {
		return err
	}

	track, err := gpx.Read(response)

	if err != nil {
		flagProcessingFailed(db, id)
		return err
	}

	log.Printf("Read, preparing to commit tracks: %+v\n", track)

	tx, err := db.Begin()
	if err != nil {
		flagProcessingFailed(db, id)
		return err
	}
	stmt, err := db.Prepare(`UPDATE travel_path set geometry = $1, processing_state = 'READY' where id = $2`)
	if err != nil {
		return err
	}

	defer tx.Rollback()

	for _, trk := range track.Trk {
		log.Printf("examining track: %+v\n", trk)

		ewkbhexGeom, err := ewkbhex.Encode(trk.Geom(geom.XY), ewkbhex.NDR)
		if err != nil {
			flagProcessingFailed(db, id)
			return err
		}

		stmt.Exec(ewkbhexGeom, id)

		err = stmt.Close()
		if err != nil {
			flagProcessingFailed(db, id)
			return err
		}

	}

	log.Printf("Processing complete for %+v\n", minioIdentifier)

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
		SELECT f.id as id, f.minio_identifier as minio_identifier, tp.id as travel_path from file_upload f join travel_path tp on f.travel_path_id = tp.id where tp.processing_state = 'NEW';
	`)
	if err != nil {
		return err
	}

	defer rows.Close()

	for rows.Next() {
		var fileID int
		var minioID string
		var travelPathID int

		if err := rows.Scan(&fileID, &minioID, &travelPathID); err != nil {
			return err
		}

		log.Printf("Will process file id: %+v, (%+v)\n", fileID, minioID)

		if err := processEntry(db, client, minioID, travelPathID); err != nil {
			log.Printf("Error processing file %s\n", err)
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
		time.Sleep(1 * time.Minute)
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
