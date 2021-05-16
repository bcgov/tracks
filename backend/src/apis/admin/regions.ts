import {Response} from 'express';
import {TracksRequest} from "../../tracks";

const regions = {
  list: async (req: TracksRequest, res: Response): Promise<Response> => {

    const queryResult = await req.database.query({
      text: `select r.id as id, r.name as region
             from region r
             order by r.name asc`,
    });

    return res.status(200).send(queryResult.rows);

  },
}
export {regions};
