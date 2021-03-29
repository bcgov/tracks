import {
  SIGNUP_REQUEST_BINDING_SUBMIT,
  SIGNUP_REQUEST_BINDING_STARTED,
  SIGNUP_REQUEST_BINDING_COMPLETE,
  SIGNUP_REQUEST_BINDING_ERROR
} from "../actions";


class SignupState {

  constructor() {
    this.loading = false;
    this.error = false;
    this.success = false;
  }

  loading: boolean;
  error: boolean;
  success: boolean;
}

const initialState = new SignupState();

const Signup = (state = initialState, action) => {

  switch (action.type) {

    case SIGNUP_REQUEST_BINDING_SUBMIT: {
      return {
        ...state,
        loading: false,
        error: false,
        success: false
      }
    }
    case SIGNUP_REQUEST_BINDING_STARTED: {
      return {
        ...state,
        loading: true,
        error: false,
        success: false
      }
    }
    case SIGNUP_REQUEST_BINDING_COMPLETE: {
      return {
        ...state,
        loading: false,
        success: true,
        error: false
      }
    }
    case SIGNUP_REQUEST_BINDING_ERROR: {
      return {
        ...state,
        loading: false,
        success: false,
        error: true
      }
    }


    default:
      return state;
  }
};

export {Signup};
