import {Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import {TracksRequest} from "../../tracks";

const dataExports = {
  request: async (req: TracksRequest, res: Response): Promise<Response> => {

    const {reportIds} = req.body;

    let queryResult = await req.database.query({
      text: `insert into export_request (user_sub, minio_identifier)
             values ($1, $2) returning id`,
      values: [req.tracksContext.subject, uuidv4()]
    });

    const exportId = queryResult.rows[0].id;

    for (const reportId of reportIds) {

      queryResult = await req.database.query({
        text: `insert into export_request_report (export_request_id, report_id)
               values ($1, $2)`,
        values: [exportId, reportId]
      });
    }

    return res.status(200).send({"id": exportId});

  },
  detail: async (req: TracksRequest, res: Response): Promise<Response> => {
    const id = req.params['id'];

    const queryResult = await req.database.query({
      text: `select e.status as status
             from export_request e
             where e.id = $1
               and e.user_sub = $2`,
      values: [id, req.tracksContext.subject]
    });

    if (queryResult.rowCount === 0) {
      return res.status(404).send();
    } else {
      return res.status(200).send(queryResult.rows[0]);
    }

  }
}
export {dataExports};
