// clear
import axios from "axios";
import CONFIG from "../../config";
import {put, select, takeLatest} from "redux-saga/effects";
import {getAuthHeaders} from "../utilities/authentication_helper";
import {
  TRAVEL_PATH_UPLOAD_COMPLETE,
  TRAVEL_PATH_UPLOAD_ERROR,
  TRAVEL_PATH_UPLOAD_REQUEST,
  TRAVEL_PATH_UPLOAD_STARTED, TravelPathActions
} from "../actions";

function* handleUploadRequest(action) {

  const {files, metadata} = action.payload;

  try {
    yield put({type: TRAVEL_PATH_UPLOAD_STARTED, payload: {}});

    const uploadedFiles = [];

    for (const f of files) {
      // const blob: Blob = yield f.arrayBuffer();

      const response = yield axios.get(`${CONFIG.API_BASE}/api/v1/operator/travel_paths/upload_request`, {
        headers: yield select(getAuthHeaders),
      });

      const uploadMetadata = response.data;
      uploadedFiles.push({id: uploadMetadata.id});

      console.dir(uploadedFiles);

      yield axios.put(uploadMetadata.url, yield f.arrayBuffer(), {
        onUploadProgress: (event) => {
          // upload progess report. we could do something useful with this.
        }
      });
    }

    axios.post(`${CONFIG.API_BASE}/api/v1/operator/travel_paths`, {
      ...metadata,
      files: uploadedFiles
    }, {
      headers: yield select(getAuthHeaders),
    });

    yield put({type: TRAVEL_PATH_UPLOAD_COMPLETE});
    yield put({type: TravelPathActions.LIST_REQUEST});
  } catch (e) {
    yield put({type: TRAVEL_PATH_UPLOAD_ERROR});
  }
}

function* travelPathUploadSaga() {
  yield takeLatest(TRAVEL_PATH_UPLOAD_REQUEST, handleUploadRequest);
}

export default travelPathUploadSaga;

