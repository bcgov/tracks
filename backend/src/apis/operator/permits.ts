import {Response} from 'express';
import {pool} from "../../database";
import {JWTEnhancedRequest} from "../../jwt";

const permits = {
  list: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    const org = req.tracksContext.organization;

    try {
      const queryResult = await pool.query({
        text: `select p.id as id, p.start_date as startDate, p.end_date as endDate, p.reference as reference from permit p where p.organization_id = $1 order by p.end_date desc`,
        values: [org]
      });

      return res.status(200).send(queryResult.rows);
    } catch (err) {
      return res.status(500).send();
    }
  },
}
export {permits};
