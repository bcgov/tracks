import {Response} from 'express';
import {pool} from "../../database";
import {JWTEnhancedRequest} from "../../jwt";

const tenures = {
  list: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    try {
      const queryResult = await pool.query({
        text: `select t.id                                                    as id,
                      o.name                                                  as organizationName,
                      o.id                                                    as organizationId,
                      t.start_date                                            as startDate,
                      (select count(*) from subtenure where tenure_id = t.id) as subtenures,
                      t.end_date                                              as endDate,
                      t.reference                                             as reference
               from tenure t
                        left join organization o on t.organization_id = o.id
               order by o.name asc`,
      });

      return res.status(200).send(queryResult.rows);
    } catch (err) {
      return res.status(500).send();
    }
  },
}
export {tenures};
