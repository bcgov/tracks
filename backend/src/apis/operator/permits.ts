import {Response} from 'express';
import {TracksRequest} from "../../tracks";

const permits = {
  list: async (req: TracksRequest, res: Response): Promise<Response> => {
    const org = req.tracksContext.organization;

    const queryResult = await req.database.query({
      text: `select p.id as id, p.start_date as startDate, p.end_date as endDate, p.reference as reference
             from permit p
             where p.organization_id = $1
             order by p.end_date desc`,
      values: [org]
    });

    return res.status(200).send(queryResult.rows);
  },
}
export {permits};
