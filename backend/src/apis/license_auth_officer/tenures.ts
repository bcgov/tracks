import {Response} from 'express';
import {TracksRequest} from "../../tracks";

const tenures = {
  list: async (req: TracksRequest, res: Response): Promise<Response> => {
    const queryResult = await req.database.query({
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
  },
}
export {tenures};
