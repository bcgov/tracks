import { TRIPREPORT_LOAD_COMPLETE, TRIPREPORT_LOAD_ERROR, TRIPREPORT_LOAD_REQUEST } from "../actions";

class TripReportState {
	initialized: boolean;
	loading: boolean;
	error: boolean;

	id: number | null;
	created_at: string | null;
	updated_at: string | null;
	park_permit_id: number | null;
	tenure_id: number | null;
	state: string | null;
	type: string | null;
	reporting_period_id: string | null;

	constructor() {
		this.initialized = false;
		this.loading = false;
		this.error = false;
	}
}

const initialState = new TripReportState();

const TripReports = (state = initialState, action) => {
	switch (action.type) {
	case TRIPREPORT_LOAD_REQUEST: {
		return {
			...state,
			loading: true,
			error: false,
		};
	}
	case TRIPREPORT_LOAD_ERROR: {
		return {
			...state,
			loading: false,
			error: true,
			initialized: true,
		}
	}
	case TRIPREPORT_LOAD_COMPLETE: {
		return {
			...state,
			loading: false,
			error: false,
			initialized: true,
			id: action.payload.id,
			created_at: action.payload.created_at,
			updated_at: action.payload.updated_at,
			park_permit_id: action.payload.park_permit_id,
			tenure_id: action.payload.tenure_id,
			state: action.payload.state,
			type: action.payload.type,
			reporting_period_id: action.payload.reporting_period_id,
		}
	}
	default:
		return state;
	}
}

const selectTripReports = (state) => (state.TripReports);

export {selectTripReports};
export {TripReports};
