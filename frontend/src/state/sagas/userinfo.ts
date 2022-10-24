import {all, delay, put, select, takeLatest} from 'redux-saga/effects'
import {AUTH_INITIALIZE_COMPLETE, AUTH_REQUEST_ERROR, USERINFO_LOAD_COMPLETE, USERINFO_LOAD_REQUEST} from "../actions";
import {getAuthHeaders, getIsAuthenticated} from "../utilities/authentication_helper";
import axios from "axios";
import {TracksConfig} from "../config";
import {getConfiguration} from "../utilities/config_helper";

// reload every 10 minutes
const RELOAD_USER_INFO_PERIOD = 60000 * 5;

function* loadUserInfo() {
	const isAuthenticated: boolean = yield select(getIsAuthenticated);
	const config: TracksConfig = yield select(getConfiguration);

	// skip if we're not signed in
	if (isAuthenticated) {
		try {
			const response = yield axios.get(`${config.API_BASE}/api/v1/userinfo/me`, {
				headers: yield select(getAuthHeaders),
			});
			yield (put({type: USERINFO_LOAD_COMPLETE, payload: response.data}));
		} catch (e) {
			console.error(e);
			yield(put({type: AUTH_REQUEST_ERROR}));
		}
	}
	yield (delay(RELOAD_USER_INFO_PERIOD));
	yield(put({type: USERINFO_LOAD_REQUEST}));
}

function* userInfoSaga() {
	yield all([
		takeLatest(USERINFO_LOAD_REQUEST, loadUserInfo),
		takeLatest(AUTH_INITIALIZE_COMPLETE, loadUserInfo),
	]);
}

export default userInfoSaga;
