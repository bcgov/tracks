import {Response} from 'express';
import {TracksRequest} from "../../tracks";

const permits = {
  list: async (req: TracksRequest, res: Response): Promise<Response> => {

    const queryResult = await req.database.query({
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

  },
}
export {permits};
