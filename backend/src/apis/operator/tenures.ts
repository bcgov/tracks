import {Response} from 'express';
import {TracksRequest} from "../../tracks";

const tenures = {
  list: async (req: TracksRequest, res: Response): Promise<Response> => {
    const org = req.tracksContext.organization;

    const queryResult = await req.database.query({
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

  },
}
export {tenures};
