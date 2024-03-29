import {Response} from 'express';
import {TracksRequest} from "../../tracks";

const userInfo = {

	myUserInfo: async (req: TracksRequest, res: Response): Promise<Response> => {

		const queryResult = await req.database.query({
			text: `select o.name as organization
             from organization o
             where o.id = $1`,
			values: [req.tracksContext.organization]
		});

		let org = 'Indeterminate';
		try {
			org = queryResult.rows[0].organization;
		} catch (e) {
			console.log('Unexpected error while getting user\'s organization');
			console.dir(e);
		}

		return res.status(200).send({
			bestName: req.tracksContext.bestName,
			organization: org,
			name: req.jwtClaims.name,
			email: req.jwtClaims.email,
			roles: req.jwtClaims.roles,
		});
	},
}

export {userInfo};
