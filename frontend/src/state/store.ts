import {applyMiddleware, createStore} from "redux";
import {createRootReducer} from "./reducers";
import createSagaMiddleware from 'redux-saga';
import {
	activitiesSaga,
	officersSaga,
	onboardingRequestsSaga,
	operatorsSaga,
	permitsSaga,
	reportingPeriodsSaga,
	reportsSaga,
	tenureBindingRequestsSaga,
	tenuresSaga
} from "./sagas";

import logger from 'redux-logger';
import authenticationSaga from "./sagas/auth";
import travelPathUploadSaga from "./sagas/travel_path_uploads";
import signupSaga from "./sagas/signup";
import checkSignupSaga from "./sagas/check_signup";
import userInfoSaga from "./sagas/userinfo";
import {TracksConfig} from "./config";

const setupStore = (configuration: TracksConfig) => {

	const sagaMiddleware = createSagaMiddleware();

	let middlewares;
	if (configuration.DEBUG) {
		middlewares = applyMiddleware(sagaMiddleware, logger);
	} else {
		middlewares = applyMiddleware(sagaMiddleware);
	}

	const store = createStore(createRootReducer(configuration), middlewares);

	// run the sagas
	sagaMiddleware.run(authenticationSaga);

	sagaMiddleware.run(activitiesSaga);
	sagaMiddleware.run(reportsSaga);
	sagaMiddleware.run(permitsSaga);
	sagaMiddleware.run(tenuresSaga);
	sagaMiddleware.run(operatorsSaga);
	sagaMiddleware.run(officersSaga);
	sagaMiddleware.run(reportingPeriodsSaga);
	sagaMiddleware.run(onboardingRequestsSaga);
	sagaMiddleware.run(tenureBindingRequestsSaga);
	sagaMiddleware.run(travelPathUploadSaga);
	sagaMiddleware.run(signupSaga);
	sagaMiddleware.run(checkSignupSaga);
	sagaMiddleware.run(userInfoSaga);

	return store;

};

export {setupStore};

