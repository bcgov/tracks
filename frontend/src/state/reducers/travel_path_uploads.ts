import {
  TRAVEL_PATH_UPLOAD_COMPLETE,
  TRAVEL_PATH_UPLOAD_ERROR,
  TRAVEL_PATH_UPLOAD_REQUEST,
  TRAVEL_PATH_UPLOAD_STARTED
} from "../actions";


class TravelPathUploadState {

  constructor() {
    this.uploading = false;
    this.error = false;
    this.success = false;
  }

  uploading: boolean;
  error: boolean;
  success: boolean;
}

const initialState = new TravelPathUploadState();

const TravelPathUpload = (state = initialState, action) => {
  switch (action.type) {
    case TRAVEL_PATH_UPLOAD_REQUEST: {
      return {
        ...state,
        uploading: false,
        error: false,
        success: false
      }
    }
    case TRAVEL_PATH_UPLOAD_STARTED: {
      return {
        ...state,
        uploading: true,
        error: false,
        success: false
      }
    }
    case TRAVEL_PATH_UPLOAD_COMPLETE: {
      return {
        ...state,
        uploading: false,
        success: true,
        error: false
      }
    }
    case TRAVEL_PATH_UPLOAD_ERROR: {
      return {
        ...state,
        uploading: false,
        success: false,
        error: true
      }
    }


    default:
      return state;
  }
};

export {TravelPathUpload};
