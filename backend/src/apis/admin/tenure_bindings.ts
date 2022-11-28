import {Response} from 'express';
import {TracksRequest} from "../../tracks";
import ttls from "../../services/tantalis_service";

const tenureBindings = {

	bindingRequests: async (req: TracksRequest, res: Response): Promise<Response> => {

		// wait for ttls cache to be populated
		await ttls.searchForTenures();

		const queryResult = await req.database.query({
			text: `select tbr.id,
                    tbr.reference,
                    tbr.state,
                    tbr.requested_start_date,
                    tbr.requested_end_date,
                    tbr.created,
       							tbr.reason,
                    o.name as organization
             from tenure_binding_request tbr
                      inner join organization o on tbr.organization_id = o.id
             order by created desc`
		});

		const mappedResults = [];
		for (const row of queryResult.rows) {
			mappedResults.push({
				...row,
				tantalisMatch: await ttls.searchTenureByFileNumber(row['reference'])
			});
		}

		return res.status(200).send(mappedResults);
	},


	action: async (req: TracksRequest, res: Response): Promise<Response> => {

		if (req.body.action == 'ACCEPT') {
			//map the tenure to the org
			await req.database.query({
				text: `insert into tenure_organization (organization_id, reference, start_date, end_date)
               values ((select organization_id from tenure_binding_request where id = $1),
                       (select reference from tenure_binding_request where id = $1),
                       (select requested_start_date from tenure_binding_request where id = $1),
                       (select requested_end_date from tenure_binding_request where id = $1))`,
				values: [req.body.id]
			});

			//update the request
			await req.database.query({
				text: `update tenure_binding_request
               set state = 'ACCEPTED'
               where id = $1`,
				values: [req.body.id]
			});

		} else if (req.body.action == 'REJECT') {
			//update the request
			await req.database.query({
				text: `update tenure_binding_request
               set state  = 'REJECTED',
                   reason = $2
               where id = $1`,
				values: [req.body.id, req.body.reason]
			});
		} else {
			//what do you want me to do?
			return res.status(400).send();
		}


		return res.status(201).send();

	}
}

export {tenureBindings};
