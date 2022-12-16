import {Response} from 'express';
import {TracksRequest} from "../../tracks";

const activities = {

  list: async (req: TracksRequest, res: Response): Promise<Response> => {
    const queryResult = await req.database.query({
      text: `select tp.id                  as id,
                    tp.created_at          as createdAt,
                    tp.mode_of_transport   as mode,
                    ST_Length(tp.geometry) as meters,
                    tp.start_time          as startTime,
                    tp.end_time            as endTime,
                    tp.processing_state    as processingState
             from activity as tp
             order by createdAt desc`,
    });

    return res.status(200).send(queryResult.rows);
  }
}
export {activities};
