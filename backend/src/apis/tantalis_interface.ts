import {Request, Response} from 'express';
import {TantalisService} from "../services/tantalis_service";


class TantalisInterface {


  constructor() {

  }

  private ttls = new TantalisService();

  async listTenures(req: Request, res: Response): Promise<Response> {
    return res.status(200).send(
      await this.ttls.searchForTenures()
    );
  }

  async getTenure(req: Request, res: Response): Promise<Response> {
    const id = req.params['id'];

    return res.status(200).send(
      await this.ttls.getLandUse(id)
    );
  }

  async searchForOrganization(req: Request, res: Response): Promise<Response> {
    const q = req.params['q'];

    return res.status(200).send(
      await this.ttls.searchInterestedPartiesByName(q)
    );

  }


}

export {TantalisInterface};
