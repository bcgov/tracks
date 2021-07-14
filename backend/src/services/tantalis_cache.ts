import {CONFIG} from "../config";
import querystring from "querystring";
import axios from "axios";
import {token} from "morgan";
import {db} from "../database";

class TantalisCache {

  constructor() {
    //
  }

  private CACHE_TIME = '30 days';

  async contains(area, key) {
    const queryResult = await db.query({
      text: 'select count(*) as matches from ttls_cache where area = $1 and key = $2 and (expires is null or expires > current_timestamp)',
      values: [area, key]
    });
    return queryResult.rows[0]['matches'] > 0;
  }

  async get(area, key) {
    const queryResult = await db.query({
      text: 'select data from ttls_cache where area = $1 and key = $2 and (expires is null or expires > current_timestamp)',
      values: [area, key]
    });
    if (queryResult.rowCount === 0) {
      throw new Error("Unexpected cache failure");
    }
    return queryResult.rows[0]['data'];
  }

  async set(area, key, data) {
    await db.query({
      text: `insert into ttls_cache (area, key, expires, data) values ($1,$2,current_timestamp + interval '${this.CACHE_TIME}' ,$3) on conflict on constraint unique_area_key do update set data = $3, expires = current_timestamp + interval '${this.CACHE_TIME}'`,
      values: [area, key, JSON.stringify(data)]
    });
  }


}

export {TantalisCache};
