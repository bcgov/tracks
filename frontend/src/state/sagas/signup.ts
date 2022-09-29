// clear
import axios from "axios";
import {put, select, takeLatest} from "redux-saga/effects";
import {getAuthHeaders} from "../utilities/authentication_helper";
import {
	SIGNUP_REQUEST_BINDING_COMPLETE,
	SIGNUP_REQUEST_BINDING_ERROR,
	SIGNUP_REQUEST_BINDING_STARTED, SIGNUP_REQUEST_BINDING_SUBMIT
} from "../actions";
import {TracksConfig} from "../config";
import {getConfiguration} from "../utilities/config_helper";


function* handleRequestRoleBinding(action) {
	const config: TracksConfig = yield select(getConfiguration);

	const {request} = action.payload;

	yield put({type: SIGNUP_REQUEST_BINDING_STARTED});

	try {
		yield axios.post(`${config.API_BASE}/api/v1/signup`, {
			...request,
		}, {
			headers: yield select(getAuthHeaders),
		});

		yield put({type: SIGNUP_REQUEST_BINDING_COMPLETE});
	} catch (e) {
		yield put({type: SIGNUP_REQUEST_BINDING_ERROR});
	}
}

function* signupSaga() {
	yield takeLatest(SIGNUP_REQUEST_BINDING_SUBMIT, handleRequestRoleBinding);
}

export default signupSaga;

