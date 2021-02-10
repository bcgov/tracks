import {Response} from 'express';
import {pool} from "../../database";
import {JWTEnhancedRequest} from "../../jwt";

const reportingPeriods = {

  list: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    try {
      const queryResult = await pool.query({
        text: `select rp.id,
                      rp.end_date,
                      rp.start_date,
                      rp.deadline
               from reporting_period rp
               order by deadline desc`
      });
      return res.status(200).send(queryResult.rows);
    } catch (err) {
      return res.status(500).send();
    }
  },
}
export {reportingPeriods};
