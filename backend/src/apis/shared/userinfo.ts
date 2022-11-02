import {Response} from 'express';
import {TracksRequest} from "../../tracks";

const userInfo = {

	myUserInfo: async (req: TracksRequest, res: Response): Promise<Response> => {

		const roleEnums = {
			admin: 'System Administrator',
			area_admin: 'Regional Administrator',
			conservation_officer: 'Conservation Officer',
			license_auth_officer: 'Authorizations Officer'
		};

		const roleLabels = () => {
			const labeledRoles = [];
			req.jwtClaims.roles.map((item) => {
				labeledRoles.push(roleEnums[`${item}`]);
			});
			return labeledRoles;
		}

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
			organization: org,
			name: req.jwtClaims.name,
			email: req.jwtClaims.email,
			roles: roleLabels || 'none',
		});
	},
}

export {userInfo};
