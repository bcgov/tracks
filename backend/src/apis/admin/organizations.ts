import {Response} from 'express';
import {TracksRequest} from "../../tracks";

const organizations = {
  list: async (req: TracksRequest, res: Response): Promise<Response> => {
    const queryResult = await req.database.query({
      text: `select o.id as id, o.name as name, r.name as region, o.type as type, o.active as active
             from organization o
                      left join region r on r.id = o.region_id
             order by r.name, o.name`,
    });

    return res.status(200).send(queryResult.rows);
  },
  operators: async (req: TracksRequest, res: Response): Promise<Response> => {
    const queryResult = await req.database.query({
      text: `select o.id as id, o.name as name, r.name as region, o.type as type, o.active as active
             from organization o
                      left join region r on r.id = o.region_id
             where o.type = $1
             order by r.name, o.name`,
      values: ['COMMERCIAL OPERATOR']
    });

    return res.status(200).send(queryResult.rows);

  },
  view: async (req: TracksRequest, res: Response): Promise<Response> => {
    const id = req.params['id'];

    const queryResult = await req.database.query({
      text: `select o.id as id, o.name as name, r.name as region, o.type as type, o.active as active
             from organization o
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
export {organizations};
