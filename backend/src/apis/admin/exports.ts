import {Response} from 'express';
import {pool} from "../../database";
import {JWTEnhancedRequest} from "../../jwt";
import {v4 as uuidv4} from 'uuid';

const dataExports = {
  request: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {

    const {reportIds} = req.body;

    try {
      const queryResult = await pool.query({
        text: `insert into export_request ( user_sub, minio_identifier ) values ($1, $2) returning id`,
        values: [req.tracksContext.subject, uuidv4()]
      });

      console.dir(queryResult.rows);

      return res.status(200).send(queryResult.rows[0].id);
    } catch (err) {
      return res.status(500).send();
    }
  },
  detail: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    const id = req.params['id'];

    try {
      const queryResult = await pool.query({
        text: `select e.status as status
               from export_request e
               where e.id = $1
                 and e.user_sub = $2`,
        values: [id, req.tracksContext.subject]
      });

      if (queryResult.rowCount === 0) {
        res.status(404).send();
      } else {
        res.status(200).send(queryResult.rows[0]);
      }

    } catch (err) {
      return res.status(500).send();
    }
  }
}
export {dataExports};
