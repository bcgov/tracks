import {Response} from 'express';
import {pool} from "../../database";
import {JWTEnhancedRequest} from "../../jwt";

const tenures = {
  list: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    const org = req.tracksContext.organization;


    try {

      const queryResult = await pool.query({
        text: `select t.id                                                    as id,
                      t.start_date                                            as startDate,
                      (select count(*) from subtenure where tenure_id = t.id) as subtenures,
                      t.end_date                                              as endDate,
                      t.reference                                             as reference
               from tenure t
               where t.organization_id = $1
               order by t.end_date desc`,
        values: [org]
      });

      return res.status(200).send(queryResult.rows);
    } catch (err) {
      return res.status(500).send();
    }
  },
  view: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    const org = req.tracksContext.organization;
    const id = req.params['id'];

    try {
      const queryResult = await pool.query({
        text: `select t.id                                                    as id,
                      t.start_date                                            as startDate,
                      (select count(*) from subtenure where tenure_id = t.id) as subtenures,
                      t.end_date                                              as endDate,
                      t.reference                                             as reference
               from tenure t
               where t.organization_id = $1
                 and t.id = $2`,
        values: [org, id]
      });

      if (queryResult.rowCount === 0) {
        res.status(404).send();
      } else {
        res.status(200).send(queryResult.rows[0]);
      }
    } catch (err) {
      return res.status(500).send();
    }
  },
}
export {tenures};
