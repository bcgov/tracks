import {Response} from 'express';
import {pool} from "../../database";
import {JWTEnhancedRequest} from "../../jwt";

const activities = {
  list: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {

    const user = req.tracksContext.subject;

    try {
      const queryResult = await pool.query({
        text: `select tp.id                  as id,
                      tp.created_at          as createdAt,
                      tp.mode_of_transport   as mode,
                      ST_Length(tp.geometry) as meters,
                      tp.start_time          as startTime,
                      tp.processing_state    as processingState,
                      o.name                 as organizationName
               from activity as tp
                        left join organization o on o.id = tp.organization_id
               where tp.user_sub = $1
               order by createdAt desc`,
        values: [user]
      });

      return res.status(200).send(queryResult.rows);
    } catch (err) {
      return res.status(500).send();
    }
  },
  view: async (req: JWTEnhancedRequest, res: Response): Promise<Response> => {

    const id = req.params['id'];

    try {
      const queryResult = await pool.query({
        text: `select tp.id                                        as id,
                      ST_AsGEOJSON(tp.geometry)::json              AS geometry,
                      ST_AsGEOJSON(ST_Centroid(tp.geometry))::json as centroid,
                      tp.mode_of_transport                         as mode,
                      ST_Length(tp.geometry)                       as meters,
                      tp.created_at                                as createdAt,
                      tp.start_time                                as startTime,
                      tp.processing_state                          as processingState,
                      o.name                                       as organizationName
               from activity as tp
                        left join organization o on o.id = tp.organization_id
               where tp.id = $1`,
        values: [id]
      });

      if (queryResult.rowCount === 0) {
        res.status(404).send();
      } else {
        res.status(200).send(queryResult.rows[0]);
      }

      return res.status(200).send(queryResult.rows);
    } catch (err) {
      return res.status(500).send();
    }
  }
}
export {activities};
