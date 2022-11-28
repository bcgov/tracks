import {Request, Response} from 'express';
import ttls from "../services/tantalis_service";


class TantalisInterface {

	async listTenures(req: Request, res: Response): Promise<Response> {
		return res.status(200).send(
			await ttls.searchForTenures()
		);
	}

	async getTenure(req: Request, res: Response): Promise<Response> {
		const id = req.params['id'];

		return res.status(200).send(
			await ttls.getLandUse(id)
		);
	}

	async searchForOrganization(req: Request, res: Response): Promise<Response> {
		const q = req.params['q'];

		return res.status(200).send(
			await ttls.searchInterestedPartiesByName(q)
		);

	}


}

export {TantalisInterface};
