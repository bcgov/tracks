import {Response} from 'express';
import {TracksRequest} from "../../tracks";


interface RequestNewTenureBinding {
	reference: string;
}

const tenures = {
	list: async (req: TracksRequest, res: Response): Promise<Response> => {
		const org = req.tracksContext.organization;

		const queryResult = await req.database.query({
			text: `select t.id                                                    as id,
                    t.start_date                                            as startDate,
                    (select count(*) from subtenure where tenure_id = t.id) as subtenures,
                    t.end_date                                              as endDate,
                    t.reference                                             as reference
             from tenure_organization t
             where t.organization_id = $1
             order by t.end_date desc`,
			values: [org]
		});
		return res.status(200).send(queryResult.rows);
	},

	binding_requests: async (req: TracksRequest, res: Response): Promise<Response> => {
		const org = req.tracksContext.organization;

		const queryResult = await req.database.query({
			text: `select t.id        as id,
                    t.reference as reference,
                    t.created   as created,
                    t.state     as state,
                    t.reason    as reason
             from tenure_binding_request t
             where t.organization_id = $1
             order by t.created desc`,
			values: [org]
		});
		return res.status(200).send(queryResult.rows);
	},

	request_binding: async (req: TracksRequest, res: Response): Promise<Response> => {
		const org = req.tracksContext.organization;
		const newBindingRequest: RequestNewTenureBinding = req.body;

		const queryResult = await req.database.query({
			text: `insert into tenure_binding_request(state, reference, organization_id)
             values ($1, $2, $3)
             returning id
			`,
			values: ['SUBMITTED', newBindingRequest.reference, org]
		});

		return res.status(201).send(queryResult.rows[0]['id']);
	},
}
export {tenures};
