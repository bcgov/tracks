import {Response} from 'express';
import {pool} from "../../database";
import {JWTEnhancedRequest} from "../../jwt";
import {KeycloakManagerService} from "../../services/keycloak_manager_service";

const userSignup = {

  bindingRequests: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    try {

      const queryResult = await pool.query({
        text: `select *
               from role_binding_request
               order by created desc`
      });

      return res.status(200).send(queryResult.rows);
    } catch (err) {
      console.dir(err);
      return res.status(500).send();
    }
  },

  action: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {
    try {

      //@todo ensure this happens in one transaction

      if (req.body.action == 'ACCEPT') {
        const queryResult = await pool.query({
          text: `select sub, requested_role from  role_binding_request where id = $1`,
          values: [req.body.id]
        });

        if (queryResult.rows.length != 1) {
          throw new Error("Unexpected result")
        }

        const {sub, requested_role} = queryResult.rows[0];


        //map the user to the org
        await pool.query({
          text: `insert into user_mapping (sub, username, organization_id)
                 values ((select sub from role_binding_request where id = $1),
                         (select username from role_binding_request where id = $1),
                         $2)`,
          values: [req.body.id, req.body.organization]
        });

        //update the request
        await pool.query({
          text: `update role_binding_request
                 set status = 'ACTIONED'
                 where id = $1`,
          values: [req.body.id]
        });

        const kms = new KeycloakManagerService();
        await kms.bindUserToRole(sub, requested_role);

      } else if (req.body.action == 'REJECT') {
        //update the request
        await pool.query({
          text: `update role_binding_request
                 set status = 'REJECTED'
                 where id = $1`,
          values: [req.body.id]
        });
      } else {
        //what do you want me to do?
        return res.status(400).send();
      }


      return res.status(201).send();
    } catch (err) {
      console.dir(err);
      return res.status(500).send();
    }
  }
}

export {userSignup};
