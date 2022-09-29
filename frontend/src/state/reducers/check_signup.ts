import {
	CHECK_SIGNUP_STATUS_COMPLETE, CHECK_SIGNUP_STATUS_ERROR,
	CHECK_SIGNUP_STATUS_REQUEST, CHECK_SIGNUP_STATUS_STARTED

} from "../actions";


class CheckSignupState {

	constructor() {
		this.loading = false;
		this.error = false;
		this.success = false;
		this.signupRequested = null;
	}

	loading: boolean;
	error: boolean;
	success: boolean;
	signupRequested: boolean;
}

const initialState = new CheckSignupState();

const CheckSignup = (state = initialState, action) => {

	switch (action.type) {

	case CHECK_SIGNUP_STATUS_REQUEST: {
		return {
			...state,
			loading: false,
			error: false,
			success: false,
			signupRequested: null
		}
	}
	case CHECK_SIGNUP_STATUS_STARTED: {
		return {
			...state,
			loading: true,
			error: false,
			success: false,
			signupRequested: null
		}
	}
	case CHECK_SIGNUP_STATUS_COMPLETE: {
		return {
			...state,
			loading: false,
			success: true,
			error: false,
			signupRequested: action.payload.hasRequest
		}
	}
	case CHECK_SIGNUP_STATUS_ERROR: {
		return {
			...state,
			loading: false,
			success: false,
			error: true,
			signupRequested: null
		}
	}


	default:
		return state;
	}
};

export {CheckSignup};
