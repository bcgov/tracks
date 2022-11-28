import {CONFIG} from "../config";
import querystring from "querystring";
import axios from "axios";
import {db} from "../database";
import {TantalisCache} from "./tantalis_cache";

class TantalisService {

	cache = new TantalisCache();

	constructor() {
		//
	}


	private token: any = null;
	private tokenExpiresIn: number = null;
	private tokenReceived: number = null;

	private clearToken() {
		this.token = null;
		this.tokenExpiresIn = null;
		this.tokenReceived = null;
	}

	private setToken(token, expiresIn) {
		this.token = token;
		this.tokenExpiresIn = expiresIn;
		this.tokenReceived = Math.floor(Date.now() / 1000);
	}


	private async refreshTokenAndGet(url: string) {
		const token = await this.refreshToken();

		try {
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

	async refreshToken() {

		const TOKEN_GRACE_PERIOD = 300;

		if (this.token != null) {
			if ((this.tokenReceived + this.tokenExpiresIn - Math.floor(Date.now() / 1000)) > TOKEN_GRACE_PERIOD) {
				return this.token;
			}
		}

		console.log('refreshing token');

		const tokenUrl = `${CONFIG.TANTALIS_OAUTH_BASE}/token`;
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
			this.setToken(tokenResponse.data['access_token'], tokenResponse.data['expires_in']);
			return tokenResponse.data['access_token'];
		} catch (err) {
			console.dir(err);
			this.clearToken();
			throw new Error("invalid response");
		}
	}


	async getAllCodes() {
		return this.refreshTokenAndGet(`${CONFIG.TANTALIS_API_BASE}/codes`);
	}

	async getLandUseCodes() {
		return this.refreshTokenAndGet(`${CONFIG.TANTALIS_API_BASE}/codes/landUseTypeCodes`);

	}

	async getPurposeCodes() {
		return this.refreshTokenAndGet(`${CONFIG.TANTALIS_API_BASE}/codes/purposeCodes`);
	}

	async getStageCodes() {
		return this.refreshTokenAndGet(`${CONFIG.TANTALIS_API_BASE}/codes/stageCodes`);

	}

	async getStatusCodes() {
		return this.refreshTokenAndGet(`${CONFIG.TANTALIS_API_BASE}/codes/statusCodes`);
	}

	async searchForTenures(detail = false, purpose = '13', status = 'GS') {
		const cacheKey = `${purpose}:${status}:${detail ? "detailed" : "summary"}`;
		try {
			if (await this.cache.contains('tenure_search', cacheKey)) {
				return await this.cache.get('tenure_search', cacheKey);
			}
		} catch (e) {
			console.log('Unexpected caching failure, proceeding with request', e);
			throw(e);
		}

		let pageNumber = 1;
		let mergeResults = [];
		let pageResult;

		do {
			const url = `${CONFIG.TANTALIS_API_BASE}/landUseApplications?pageNumber=${pageNumber++}&pageRowCount=100&purpose=${encodeURIComponent(purpose)}&status=${encodeURIComponent(status)}`;
			pageResult = await this.refreshTokenAndGet(url);
			mergeResults = mergeResults.concat(pageResult['elements']);
		} while (pageResult['pageRowCount'] > 0 && pageNumber < 50);

		const mappedResults = [];

		for (const landUse of mergeResults) {
			if (detail) {
				mappedResults.push(await this.mapLandUse(await this.getLandUse(landUse.landUseApplicationId)));
			} else {
				mappedResults.push(await this.mapLandUse(landUse));
			}
		}

		await this.cache.set('tenure_search', cacheKey, mappedResults);
		return mappedResults;

	}

	async getLandUse(id: string) {
		try {
			if (await this.cache.contains('land_use', id)) {
				return await this.cache.get('land_use', id);
			}
		} catch (e) {
			console.log('Unexpected caching failure, proceeding with request', e);
		}

		const url = `${CONFIG.TANTALIS_API_BASE}/landUseApplications/${encodeURIComponent(id)}`;

		const result = await this.refreshTokenAndGet(url);
		const mappedResult = await this.mapLandUse(result);
		await this.cache.set('land_use', id, mappedResult);
		return mappedResult;

	}

	async searchTenureByFileNumber(fn: string) {
		try {
			if (await this.cache.contains('file_number', fn)) {
				return await this.cache.get('file_number', fn);
			}
		} catch (e) {
			console.log('Unexpected caching failure, proceeding with request', e);
		}

		const url = `${CONFIG.TANTALIS_API_BASE}/landUseApplications/?pageNumber=1&pageRowCount=100&purpose=13&status=GS&fileNumber=${encodeURIComponent(fn)}`;
		const result = await this.refreshTokenAndGet(url);

		const mappedResults = [];
		for (const element of result['elements']) {
			mappedResults.push(await this.getLandUse(element.landUseApplicationId));
		}
		await this.cache.set('file_number', fn, mappedResults);
		return mappedResults;
	}

	async searchInterestedPartiesByName(q: string) {
		const url = `${CONFIG.TANTALIS_API_BASE}/interestedParties/organizations?pageNumber=1&pageRowCount=100&legalName=${encodeURIComponent(q)}`;
		return this.refreshTokenAndGet(url);
	}

	async searchInterestedPartiesByPostalCode(q: string) {
		const url = `${CONFIG.TANTALIS_API_BASE}/interestedParties/organizations?pageNumber=1&pageRowCount=100&postalCode=${encodeURIComponent(q)}`;
		return this.refreshTokenAndGet(url);
	}

	async wktToGeoJSON(wktgeometry: string) {
		if (wktgeometry == null) {
			return null;
		}

		try {
			const queryResult = await db.query({
				text: `select ST_AsGeoJSON($1) as geom`,
				values: [wktgeometry]
			});
			return queryResult.rows[0]['geom'];
		} catch (e) {
			// some of the geometry from ttls seems unparseable
			return null;
		}
	}

	async mapLandUse(data) {
		console.dir(data);
		const landUse = {
			id: data.landUseApplicationId,
			fileNumber: data.fileNumber,
			purposeCode: data.purposeCode?.code,
			stageCode: data.stageCode?.code,
			landUseTypeCode: data.landUseTypeCode?.code,
			statusCode: data.statusCode?.code,
			locationDescription: data.locationDescription,
			parcels: [],
			organizations: [],
		};
		if (data['interestParcels'] != null) {
			for (const parcel of data['interestParcels']) {
				landUse.parcels.push(await this.mapParcel(parcel));
			}
		}
		if (data['interestedParties'] != null) {
			for (const party of data['interestedParties']) {
				landUse.organizations.push(await this.mapInterestedParty(party));
			}
		}
		return landUse;
	}

	async mapInterestedParty(data) {
		const party = {
			legalName: data.organization?.legalName,
			phoneNumber: data.phoneNumber,
			adddressLine1: data.adddressLine1,
			adddressLine2: data.adddressLine2,
			adddressLine3: data.adddressLine3,
			city: data.city,
			postalCode: data.postalCode,
			zipCode: data.zipCode,
			province: data.province,
			state: data.state,
			country: data.country
		};

		return party;
	}

	async mapParcel(data) {
		const parcel = {
			id: data.interestParcelId,
			legalDescription: data.legalDescription,
			geometry: await this.wktToGeoJSON(data.wktGeometry),
			featureCode: data.featureCode
		}
		return parcel;
	}


}


const instance = new TantalisService();

export default instance;
