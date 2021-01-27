import {Request, Response} from 'express';

const common = {
  notFound: async (req: Request, res: Response): Promise<Response> => {
    return res.status(404).send();
  }
};

export {common};
