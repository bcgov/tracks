import {Response} from 'express';
import {MinioService} from "../../services/minio_service";
import {TracksRequest} from "../../tracks";

class AddFile {
  id: string;
}

class TravelPathAddRequest {
  modeOfTransport: string;
  files: AddFile[];
}

const activities = {

  list: async (req: TracksRequest, res: Response): Promise<Response> => {

    const org = req.tracksContext.organization;

    const queryResult = await req.database.query({
      text: `select tp.id                  as id,
                    tp.created_at          as createdAt,
                    tp.mode_of_transport   as mode,
                    ST_Length(tp.geometry) as meters,
                    tp.start_time          as startTime,
                    tp.end_time            as endTime,
                    tp.processing_state    as processingState
             from activity as tp
             where tp.organization_id = $1
             order by createdAt desc`,
      values: [org]
    });

    return res.status(200).send(queryResult.rows);
  },

  generateUploadRequest: async (req: TracksRequest, res: Response): Promise<Response> => {

    const insertFileUpload = async (minioIdentifier) => {
      const result = await req.database.query({
        text: `insert into file_upload(user_sub, organization_id, minio_identifier)
               values ($1, $2, $3) returning id`,
        values: [req.tracksContext.subject, req.tracksContext.organization, minioIdentifier]
      });
      return result.rows[0]['id'];
    };

    try {
      const uploadParameters = await MinioService.generateUploadURL();

      const data = {
        url: uploadParameters.url,
        id: await insertFileUpload(uploadParameters.reference),
      };

      return res.status(200).send(data);
    } catch (err) {
      req.database.rollback();
      throw(err);
    }
  },


  add: async (req: TracksRequest, res: Response): Promise<Response> => {
    const addRequest: TravelPathAddRequest = req.body;
    //@todo validate. also confirm uuids match previous file uploads

    let q = {
      text: `insert into activity(user_sub, organization_id, mode_of_transport)
             values ($1, $2, $3) returning id`,
      values: [req.tracksContext.subject, req.tracksContext.organization, addRequest.modeOfTransport]
    };

    const result = await req.database.query(q);
    const travelPathID = result.rows[0]['id'];

    // associate the files with this travel path
    for (const f of addRequest.files) {
      q = {
        text: `update file_upload
               set activity_id = $4
               where user_sub = $1
                 and organization_id = $2
                 and id = $3`,
        values: [req.tracksContext.subject, req.tracksContext.organization, f.id, travelPathID],
      }
      await req.database.query(q);
    }

    return res.status(200).send(result);
  },

  view: async (req: TracksRequest, res: Response): Promise<Response> => {

    const id = req.params['id'];
    const org = req.tracksContext.organization;

    const queryResult = await req.database.query({
      text: `select tp.id                  as id,
                    ST_AsGEOJSON(tp.geometry)::json              AS geometry, ST_AsGEOJSON(ST_Centroid(tp.geometry))::json as centroid, tp.mode_of_transport as mode,
                    ST_Length(tp.geometry) as meters,
                    tp.created_at          as createdAt,
                    tp.start_time          as startTime,
                    tp.processing_state    as processingState
             from activity as tp
             where tp.id = $1
               and tp.organization_id = $2`,
      values: [id, org]
    });

    if (queryResult.rowCount === 0) {
      return res.status(404).send();
    } else {
      return res.status(200).send(queryResult.rows[0]);
    }

  }

}
export {activities};
