import {Response} from 'express';
import {pool} from "../../database";
import {JWTEnhancedRequest} from "../../jwt";

const regions = {
  list: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    try {
      const queryResult = await pool.query({
        text: `select r.id as id, r.name as region
               from region r
               order by r.name asc`,
      });

      return res.status(200).send(queryResult.rows);
    } catch (err) {
      return res.status(500).send();
    }
  },
}
export {regions};
