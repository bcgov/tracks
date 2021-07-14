import pg, {QueryConfig} from 'pg';
import {CONFIG} from "./config";
import {Request, Response} from 'express';

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

interface TransactionalRequest extends Request {
  database: {
    pool: typeof pool,
    query: (QueryConfig) => any,
    rollback: () => void,
  }
}

const DatabaseMiddleware = () => {

  pool.connect().then((client) => {
    console.log('Database connection ok');
    client.release();
  }).catch(err => {
    console.error(`database connection error: ${err}`);
    throw(err);
  });

  return {

    transactional: () => (async (req: TransactionalRequest, response: Response, next: () => void) => {
        const client = await pool.connect();
        let shouldRollback = false;
        await client.query('BEGIN TRANSACTION');

        req.database = {
          pool,
          rollback: () => {
            shouldRollback = true;
          },
          query: async (queryConfig: QueryConfig) => {
            try {
              return await client.query(queryConfig);
            } catch (err) {
              console.log(`Error in database query: ${err}, scheduling rollback`);
              shouldRollback = true;
              throw err;
            }
          }
        };

        next();

        try {
          if (shouldRollback) {
            await client.query('ROLLBACK');
          } else {
            await client.query('COMMIT');
          }
        } finally {
          client.release();
        }

      }
    )
  }
};


export {
  DatabaseMiddleware,
  TransactionalRequest,
  pool as db,
}
