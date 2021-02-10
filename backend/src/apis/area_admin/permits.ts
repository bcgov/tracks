import {Response} from 'express';
import {pool} from "../../database";
import {JWTEnhancedRequest} from "../../jwt";

const permits = {
  list: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {

    try {
      const queryResult = await pool.query({
        text: `select p.id         as id,
                      o.name       as organizationName,
                      o.id         as organizationId,
                      p.start_date as startDate,
                      p.end_date   as endDate,
                      p.reference  as reference
               from permit p
                        left join organization o on p.organization_id = o.id
               order by p.end_date desc`,
      });

      return res.status(200).send(queryResult.rows);
    } catch (err) {
      return res.status(500).send();
    }
  },
}
export {permits};
