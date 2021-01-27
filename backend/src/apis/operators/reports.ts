import {Response} from 'express';
import {pool} from "../../database";
import {JWTEnhancedRequest} from "../../jwt";

const reports = {
  list: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    try {
      const organization = req.tracksContext.organization;

      const queryResult = await pool.query({
        text: `select r.id         as id,
                      r.state      as state,
                      pp.reference as parkPermit,
                      t.reference  as tenure,
                      r.period_start_date,
                      r.period_end_date,
                      r.updated_at
               from report r

                        left join permit pp on r.park_permit_id = pp.id
                        left join tenure t on r.tenure_id = t.id
               where type = 'TRAVEL PATH REPORT'
                 and r.organization_id = $1
               order by state, period_end_date desc`,
        values: [organization]
      });

      return res.status(200).send(queryResult.rows);
    } catch (err) {
      return res.status(500).send();
    }
  },
}
export {reports};
