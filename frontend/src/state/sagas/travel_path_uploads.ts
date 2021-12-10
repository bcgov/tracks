// clear
import axios from "axios";
import {put, select, takeLatest} from "redux-saga/effects";
import {getAuthHeaders} from "../utilities/authentication_helper";
import {
  TRAVEL_PATH_UPLOAD_COMPLETE,
  TRAVEL_PATH_UPLOAD_ERROR,
  TRAVEL_PATH_UPLOAD_REQUEST,
  TRAVEL_PATH_UPLOAD_STARTED
} from "../actions";
import {TracksConfig} from "../config";
import {getConfiguration} from "../utilities/config_helper";

function* handleUploadRequest(action) {

  const {files, metadata} = action.payload;
  const config: TracksConfig = yield select(getConfiguration);

  try {
    yield put({type: TRAVEL_PATH_UPLOAD_STARTED, payload: {}});

    const uploadedFiles = [];

    for (const f of files) {
      const response = yield axios.get(`${config.API_BASE}/api/v1/operator/activities/upload_request`, {
        headers: yield select(getAuthHeaders),
      });

      const uploadMetadata = response.data;
      uploadedFiles.push({id: uploadMetadata.id});

      yield axios.put(uploadMetadata.url, yield f.arrayBuffer(), {
        onUploadProgress: (event) => {
          // upload progess report. we could do something useful with this.
        }
      });
    }

    axios.post(`${config.API_BASE}/api/v1/operator/activities`, {
      ...metadata,
      files: uploadedFiles
    }, {
      headers: yield select(getAuthHeaders),
    });

    yield put({type: TRAVEL_PATH_UPLOAD_COMPLETE});
  } catch (e) {
    yield put({type: TRAVEL_PATH_UPLOAD_ERROR});
  }
}

function* travelPathUploadSaga() {
  yield takeLatest(TRAVEL_PATH_UPLOAD_REQUEST, handleUploadRequest);
}

export default travelPathUploadSaga;

