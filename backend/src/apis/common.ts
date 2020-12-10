import { Request, Response } from 'express';

const notFound = async function (req: Request, res: Response): Promise<Response> {
    return res.status(404).send();
};

export {notFound};
