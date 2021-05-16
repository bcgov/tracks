import {Response} from 'express';
import {TracksRequest} from "../../tracks";

const userSignup = {

  requestBinding: async (req: TracksRequest, res: Response): Promise<Response> => {

    await req.database.query({
      text: `insert into role_binding_request (sub, username, full_name, email, reason, requested_role,
                                               requested_organization_id)
             values ($1, $2, $3, $4, $5, $6, $7)`,
      values: [req.jwtClaims.sub, req.jwtClaims.preferredUsername, req.jwtClaims.name, req.jwtClaims.email, req.body.reason, req.body.requestedRole, null]
    });

    return res.status(200).send();

  }
}

export {userSignup};
