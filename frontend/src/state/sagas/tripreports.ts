import {all, delay, put, select, takeLatest} from 'redux-saga/effects'
import {AUTH_INITIALIZE_COMPLETE, AUTH_REQUEST_ERROR, TRIPREPORT_LOAD_REQUEST, TRIPREPORT_LOAD_COMPLETE} from "../actions";
import {getAuthHeaders, getIsAuthenticated} from "../utilities/authentication_helper";
import axios from "axios";
import {TracksConfig} from "../config";
import {getConfiguration} from "../utilities/config_helper";

// reload every 10 minutes
const RELOAD_TRIP_REPORT_PERIOD = 60000 * 5;

function* loadTripReports() {
	const isAuthenticated: boolean = yield select(getIsAuthenticated);
	const config: TracksConfig = yield select(getConfiguration);

	// skip if we're not signed in
	if (isAuthenticated) {
		try {
			const response = yield axios.get(`${config.API_BASE}/api/v1/admin/tripReports`, {
				headers: yield select(getAuthHeaders),
			});
			yield (put({type: TRIPREPORT_LOAD_COMPLETE, payload: response.data}));
		} catch (e) {
			console.error(e);
			yield(put({type: AUTH_REQUEST_ERROR}));
		}
	}
	yield (delay(RELOAD_TRIP_REPORT_PERIOD));
	yield (put({type: TRIPREPORT_LOAD_REQUEST}));
}

function* tripReportSaga() {
	yield all([
		takeLatest(TRIPREPORT_LOAD_REQUEST, loadTripReports),
		takeLatest(AUTH_INITIALIZE_COMPLETE, loadTripReports),
	]);
}

export default tripReportSaga;
