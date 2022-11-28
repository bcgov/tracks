import {Response} from 'express';
import {TracksRequest} from "../../tracks";

const reports = {
  list: async (req: TracksRequest, res: Response): Promise<Response> => {
    const user = req.tracksContext.subject;

    const queryResult = await req.database.query({
      text: `select r.id         as id,
                    r.state      as state,
                    pp.reference as parkPermit,
                    t.reference  as tenure,
                    rp.start_date,
                    rp.end_date,
                    r.updated_at
             from trip_report r
                      left join permit pp on r.park_permit_id = pp.id
                      left join tenure_organization t on r.tenure_id = t.id
                      left join reporting_period rp on r.reporting_period_id = rp.id
             where type = 'TRACK OBSERVATION REPORT'
               and user_sub = $1
             order by state, rp.end_date desc`,
      values: [user]
    });

    return res.status(200).send(queryResult.rows);

  },
}
export {reports};
