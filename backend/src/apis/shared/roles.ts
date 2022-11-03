import {Response} from 'express';
import {TracksRequest} from "../../tracks";
import {ROLE_NAMES} from "../../constants/role_names";

const roles = {

	allRoles: async (req: TracksRequest, res: Response): Promise<Response> => {
		return res.status(200).send(ROLE_NAMES);
	},
}

export {roles};
