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

pool.on('acquire', (): void => {
  //console.log(`postgresql client acquired`);
});

pool.on('connect', (): void => {
  //console.log(`postgresql client connected`);
});

interface TransactionalRequest extends Request {
  database: {
    query: (QueryConfig) => any,
    rollback: () => void,
  }
}

const DatabaseMiddleware = {
  transactional: () => (async (req: TransactionalRequest, response: Response, next: () => void) => {
      const client = await pool.connect();
      let shouldRollback = false;
      await client.query('BEGIN TRANSACTION');

      req.database = {
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

      console.log('finalizing connection')
      try {
        if (shouldRollback) {
          await client.query('ROLLBACK');
        } else {
          await client.query('COMMMIT');
        }
      } finally {
        client.release();
      }

    }
  )
}


export {
  DatabaseMiddleware,
  TransactionalRequest
}

