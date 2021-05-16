import {CONFIG} from "../config";
import querystring from "querystring";
import axios from "axios";

class TantalisService {

  constructor() {
    //
  }

  async refreshToken() {
    const tokenUrl = `https://i1api.nrs.gov.bc.ca/oauth2/v1/oauth/token`;
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
          username: 'TRACKS_SERVICE_CLIENT',
          password: '7kv5pq6kb719eq2nqex'
        }
      });
      console.dir(tokenResponse)
      return tokenResponse.data['access_token'];
    } catch (err) {
      console.dir(err);
      throw new Error("invalid response");
    }
  }

  async getLandUseCodes() {
    const token = await this.refreshToken();

    try {

      const url = `https://i1api.nrs.gov.bc.ca/ttls-api/v1/landUseApplications?pageNumber=1&pageRowCount=50&stage=T`;
      const url2 = `https://i1api.nrs.gov.bc.ca/ttls-api/v1/codes/purposeCodes`;

      const response = await axios.get(url,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

      console.dir(response);
      //
      // const response2 = await axios.get(url2,
      //   {
      //     headers: {
      //       authorization: `Bearer ${token}`
      //     }
      //   });
      // console.dir(response2);
    } catch (err) {
      console.dir(err) ;
      console.dir(err.response.data.errors) ;
    }

  }

}

export { TantalisService };
