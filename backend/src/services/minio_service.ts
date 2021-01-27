import {CONFIG} from "../config";
import {Client} from "minio";
import {v4 as uuidv4} from 'uuid';


const BUCKET_NAME = 'gpx';
const DEFAULT_REGION = 'openshift';
const URL_EXPIRY_TIME = 4 * 3600; // 4 hours

class MinioService {
  private client: Client;

  constructor() {
    this.client = new Client({
      endPoint: CONFIG.MINIO_HOST,
      port: parseInt(CONFIG.MINIO_PORT),
      useSSL: CONFIG.MINIO_USE_SSL === 'true',
      accessKey: CONFIG.MINIO_ACCESS_KEY,
      secretKey: CONFIG.MINIO_SECRET_KEY
    });
  }

  async testConnection() {
    return this.client.bucketExists(BUCKET_NAME).then(exists => {
      if (!exists) {
        console.log('Minio upload bucket does not exist. Will create it.');
        return this.client.makeBucket(BUCKET_NAME, DEFAULT_REGION);
      }
      console.log('Minio connection ok');
    });
  }

  async generateUploadURL() {
    const objectName = uuidv4();

    return {
      url: await this.client.presignedPutObject(
        BUCKET_NAME,
        objectName,
        URL_EXPIRY_TIME
      ),
      reference: objectName
    };
  }
}


const singleton = new MinioService();

export {singleton as MinioService};
