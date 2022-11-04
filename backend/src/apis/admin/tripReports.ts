import {Response} from 'express';
import {TracksRequest} from "../../tracks";

const tripReports = {
    getAllTripReports: async (req: TracksRequest, res: Response): Promise<Response> => {
  
      const queryResult = await req.database.query({
        text: `SELECT * 
                FROM tracks.report
                ORDER BY id ASC `,
      });
  
      return res.status(200).send(queryResult.rows);
    },

    getMyTripReports: async (req: TracksRequest, res: Response): Promise<Response> => {
        const queryResult = await req.database.query({
            text: `SELECT * 
                    FROM tracks.report
                    ORDER BY id ASC `,
        });

        return res.status(200).send(queryResult.rows)
    }
  }
  export {tripReports};