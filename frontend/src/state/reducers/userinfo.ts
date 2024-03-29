import {USERINFO_LOAD_COMPLETE, USERINFO_LOAD_ERROR, USERINFO_LOAD_REQUEST} from "../actions";

class UserInfoState {
	initialized: boolean;
	loading: boolean;
	error: boolean;

	organization: string | null;
	email: string | null;
	name: string | null;
	roles: string | null;
	referenceRoles: {name: string, friendlyName: string}[];

	constructor() {
		this.initialized = false;
		this.loading = false;
		this.error = false;
	}
}

const initialState = new UserInfoState();

const UserInfo = (state = initialState, action) => {
	switch (action.type) {
	case USERINFO_LOAD_REQUEST: {
		return {
			...state,
			loading: true,
			error: false,
		};
	}
	case USERINFO_LOAD_ERROR: {
		return {
			...state,
			loading: false,
			error: true,
			initialized: true,
		}
	}
	case USERINFO_LOAD_COMPLETE: {
		return {
			...state,
			loading: false,
			error: false,
			initialized: true,
			name: action.payload.name,
			organization: action.payload.organization,
			email: action.payload.email,
			referenceRoles: action.payload.referenceRoles,
			roles: action.payload.roles.map(role => action.payload.referenceRoles.find(rr => rr.role === role) || {role, friendlyName: role})
		}
	}
	default:
		return state;
	}
}

const selectUserInfo = (state) => (state.UserInfo);

export {selectUserInfo};
export {UserInfo};
