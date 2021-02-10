import {Response} from 'express';
import {pool} from "../../database";
import {JWTEnhancedRequest} from "../../jwt";

const reports = {
  list: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    try {
      const queryResult = await pool.query({
        text: `select o.name       as organizationname,
                      r.id         as id,
                      r.state      as state,
                      pp.reference as parkPermit,
                      t.reference  as tenure,
                      rp.start_date,
                      rp.end_date,
                      r.updated_at
               from report r
                        inner join organization o on r.organization_id = o.id
                        left join permit pp on r.park_permit_id = pp.id
                        left join tenure t on r.tenure_id = t.id
                        left join reporting_period rp on r.reporting_period_id = rp.id
               where state = 'SUBMITTED'
                 and r.type = 'TRAVEL PATH REPORT'
                 and tenure_id is not null`
      });

      return res.status(200).send(queryResult.rows);
    } catch (err) {
      return res.status(500).send();
    }
  },
}
export {reports};
