import {CONFIG} from "../config";
import querystring from "querystring";
import axios from "axios";
import util from "util";
import fs from "fs";

class TantalisService {

  constructor() {
    //
  }

  async refreshToken() {
    const tokenUrl = `https://t1api.nrs.gov.bc.ca/oauth2/v1/oauth/token`;
    const payload = querystring.stringify(
      {
        'grant_type': 'client_credentials',
        'disableDeveloperFilter': true,
        'scope': 'TTLS.*'
      }
    );

    try {
      const tokenResponse = await axios.post(tokenUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: CONFIG.TANTALIS_USERNAME,
          password: CONFIG.TANTALIS_PASSWORD
        }
      });
      console.dir(tokenResponse)
      return tokenResponse.data['access_token'];
    } catch (err) {
      console.dir(err);
      throw new Error("invalid response");
    }
  }

  importAllTenures() {
    const stream = fs.createWriteStream("tenure_data.json");
    const p = new Promise((resolve, reject) => {
      stream.once('open', async () => {
          const token = await this.refreshToken();
          try {

            let pageNum = 1;
            let done = false;

            while (!done) {


              const url = `https://t1api.nrs.gov.bc.ca/ttls-api/v1/landUseApplications?pageNumber=${pageNum}&pageRowCount=100&stage=T&status=GS`;

              const response = await axios.get(url,
                {
                  headers: {
                    authorization: `Bearer ${token}`
                  }
                });

              console.dir(util.inspect(response.data, false, null, true));
              const read = response.data['elements'];

              stream.write(JSON.stringify(read));
              stream.write("\n\n");

              if (read == null || read.length == 0) {
                done = true;
              }
              pageNum++;
            }

            stream.end();
            resolve({pageNum});

          } catch (err) {
            console.dir(err);
            reject(new Error("invalid response"));
          }
        }
      )
    });

    return p;

  }

  async searchInterestedParties(q: string) {
    const token = await this.refreshToken();

    try {

      const url = `https://t1api.nrs.gov.bc.ca/ttls-api/v1/interestedParties/organizations?pageNumber=1&pageRowCount=100&legalName=${encodeURIComponent(q)}`;
      //const url = `https://t1api.nrs.gov.bc.ca/ttls-api/v1/codes/landUseTypeCodes`;

      const response = await axios.get(url,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

      return response.data;
    } catch (err) {
      console.dir(err);
      console.dir(err.response.data.errors);
      throw new Error("invalid response");

    }
  }


  async getLandUseCodes() {
    const token = await this.refreshToken();

    try {

      const url = `https://t1api.nrs.gov.bc.ca/ttls-api/v1/landUseApplications/147503`;
      //const url = `https://t1api.nrs.gov.bc.ca/ttls-api/v1/codes/landUseTypeCodes`;

      const response = await axios.get(url,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

      console.dir(util.inspect(response.data, false, null, true));
      //
      // const response2 = await axios.get(url2,
      //   {
      //     headers: {
      //       authorization: `Bearer ${token}`
      //     }
      //   });
      // console.dir(response2);
      return response.data;
    } catch (err) {
      console.dir(err);
      console.dir(err.response.data.errors);
      throw new Error("invalid response");

    }

  }

}

export {TantalisService};
