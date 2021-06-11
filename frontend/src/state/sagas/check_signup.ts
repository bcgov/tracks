// clear
import axios from "axios";
import {put, select, takeLatest} from "redux-saga/effects";
import {getAuthHeaders} from "../utilities/authentication_helper";
import {
  CHECK_SIGNUP_STATUS_COMPLETE,
  CHECK_SIGNUP_STATUS_ERROR,
  CHECK_SIGNUP_STATUS_REQUEST,
  CHECK_SIGNUP_STATUS_STARTED
} from "../actions";


function* handleCheckSignupRequest(action) {

  yield put({type: CHECK_SIGNUP_STATUS_STARTED});

  try {
    const response = yield axios.get(`${window.CONFIG.API_BASE}/api/v1/signup_requested`, {
      headers: yield select(getAuthHeaders),
    });

    yield put({type: CHECK_SIGNUP_STATUS_COMPLETE, payload: response.data});
  } catch (e) {
    yield put({type: CHECK_SIGNUP_STATUS_ERROR});
  }
}

function* checkSignupSaga() {
  yield takeLatest(CHECK_SIGNUP_STATUS_REQUEST, handleCheckSignupRequest);
}

export default checkSignupSaga;

