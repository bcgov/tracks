import {Response} from 'express';
import {pool} from "../../database";
import {JWTEnhancedRequest} from "../../jwt";

const users = {
  list: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {

    try {
      const queryResult = await pool.query({
        text: `select u.username as username, u.sub as subject, o.name as organizationName, o.id as organizationId
               from user_mapping u
                        left join organization o on u.organization_id = o.id`,
      });

      return res.status(200).send(queryResult.rows);
    } catch (err) {
      return res.status(500).send();
    }
  },
}
export {users};
