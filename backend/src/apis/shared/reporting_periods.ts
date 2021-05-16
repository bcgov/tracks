import {Response} from 'express';
import {TracksRequest} from "../../tracks";

const reportingPeriods = {

  list: async (req: TracksRequest, res: Response): Promise<Response> => {
    const queryResult = await req.database.query({
      text: `select rp.id,
                    rp.end_date,
                    rp.start_date,
                    rp.deadline
             from reporting_period rp
             order by deadline desc`
    });
    return res.status(200).send(queryResult.rows);

  },
}
export {reportingPeriods};
