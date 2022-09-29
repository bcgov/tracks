import {combineReducers} from "redux";
import {createAuthReducer} from "./auth";
import {TravelPathUpload} from "./travel_path_uploads";
import {Signup} from "./signup";

import {
	ActivityActions,
	OfficerActions,
	OnboardingRequestActions,
	OperatorActions,
	PermitActions,
	ReportActions,
	ReportingPeriodActions,
	TenureActions
} from "../actions";

import {defaultReducer, DefaultState} from "../utilities/redux_boilerplate_helper";
import {CheckSignup} from "./check_signup";
import {TracksConfig} from "../config";
import {createConfigurationReducedWithDefaultState} from "./configuration";

function createRootReducer(config: TracksConfig) {

	const rootReducer = combineReducers({
		Configuration: createConfigurationReducedWithDefaultState(config),
		Activities: defaultReducer(ActivityActions, new DefaultState()),
		Permits: defaultReducer(PermitActions, new DefaultState()),
		Tenures: defaultReducer(TenureActions, new DefaultState()),
		Reports: defaultReducer(ReportActions, new DefaultState()),
		Operators: defaultReducer(OperatorActions, new DefaultState()),
		Officers: defaultReducer(OfficerActions, new DefaultState()),
		ReportingPeriods: defaultReducer(ReportingPeriodActions, new DefaultState()),
		OnboardingRequests: defaultReducer(OnboardingRequestActions, new DefaultState()),
		CheckSignup,
		TravelPathUpload,
		Auth: createAuthReducer(config),
		Signup,
	});

	return rootReducer;
}
export {createRootReducer};

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
