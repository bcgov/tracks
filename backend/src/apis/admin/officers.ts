import {Response} from 'express';
import {TracksRequest} from "../../tracks";

const officers = {
  list: async (req: TracksRequest, res: Response): Promise<Response> => {

    const queryResult = await req.database.query({
      text: `select o.id as id, o.name as name, r.name as region
             from officer o
                      left join region r on r.id = o.region_id
             order by r.name asc`,
    });

    return res.status(200).send(queryResult.rows);

  },
  view: async (req: TracksRequest, res: Response): Promise<Response> => {
    const id = req.params['id'];

    const queryResult = await req.database.query({
      text: `select o.name as name, r.name as region, o.start_date as startDate, o.end_date as endDate
             from officer o
                      left join region r on r.id = o.region_id
             where o.id = $1`,
      values: [id]
    });

    if (queryResult.rowCount === 0) {
      return res.status(404).send();
    } else {
      return res.status(200).send(queryResult.rows[0]);
    }
  }
}
export {officers};
