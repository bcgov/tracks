import {Response} from 'express';
import {pool} from "../../database";
import {JWTEnhancedRequest} from "../../jwt";

const organizations = {
  list: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    try {
      const queryResult = await pool.query({
        text: `select o.id as id, o.name as name, r.name as region, o.type as type, o.active as active
               from organization o
                        left join region r on r.id = o.region_id
               order by r.name, o.name`,
      });

      return res.status(200).send(queryResult.rows);
    } catch (err) {
      return res.status(500).send();
    }
  },
  operators: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    try {
      const queryResult = await pool.query({
        text: `select o.id as id, o.name as name, r.name as region, o.type as type, o.active as active
               from organization o
                        left join region r on r.id = o.region_id
               where o.type = $1
               order by r.name, o.name`,
        values: ['COMMERCIAL OPERATOR']
      });

      return res.status(200).send(queryResult.rows);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  view: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    const id = req.params['id'];

    try {
      const queryResult = await pool.query({
        text: `select o.id as id, o.name as name, r.name as region, o.type as type, o.active as active
               from organization o
                        left join region r on r.id = o.region_id
               where o.id = $1`,
        values: [id]
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
export {organizations};
