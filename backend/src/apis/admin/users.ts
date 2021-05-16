import {Response} from 'express';
import {TracksRequest} from "../../tracks";


const users = {
  list: async (req: TracksRequest, res: Response): Promise<Response> => {

    const queryResult = await req.database.query({
      text: `select u.username as username, u.sub as subject, o.name as organizationName, o.id as organizationId
             from user_mapping u
                      left join organization o on u.organization_id = o.id`,
    });

    return res.status(200).send(queryResult.rows);
  }
}
export {users};
