import { Request, Response } from 'express';

const operatorsList = async function (req: Request, res: Response): Promise<Response> {

    const operators = [
        {"name": "Test Operator 1", "region": "Kamloops"},
        {"name": "Test Operator 2", "region": "Kamloops"},
        {"name": "Test Operator 3", "region": "Kelowna"},
    ]

    return res.status(200).send(operators);
};

export {operatorsList};
