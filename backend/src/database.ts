import pg, {QueryConfig} from 'pg';
import {CONFIG} from "./config";

const pool = new pg.Pool({
  user: CONFIG.TRACKS_DB_USER,
  database: CONFIG.TRACKS_DB_NAME,
  password: CONFIG.TRACKS_DB_PASSWORD,
  host: CONFIG.TRACKS_DB_HOST,
  port: CONFIG.TRACKS_DB_PORT,
  max: 10
});

pool.on('error', (err: Error): void => {
  console.log(`postgresql error: ${err}`);
});

pool.on('acquire', (): void => {
  //console.log(`postgresql client acquired`);
});

pool.on('connect', (): void => {
  //console.log(`postgresql client connected`);
});

async function query(queryConfig: QueryConfig) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN TRANSACTION');
    const result = await client.query(queryConfig);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    console.log(`Error in database query: ${err}, rolling back`);
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export {
  pool,
  query
}
