import {Response} from 'express';
import {pool} from "../../database";
import {JWTEnhancedRequest} from "../../jwt";

const officers = {
  list: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    try {
      const queryResult = await pool.query({
        text: `select o.id as id, o.name as name, r.name as region
               from officer o
                        left join region r on r.id = o.region_id
               order by r.name asc`,
      });

      return res.status(200).send(queryResult.rows);
    } catch (err) {
      return res.status(500).send();
    }
  },
  view: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    const id = req.params['id'];

    try {
      const queryResult = await pool.query({
        text: `select o.name as name, r.name as region, o.start_date as startDate, o.end_date as endDate
               from officer o
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
export {officers};
