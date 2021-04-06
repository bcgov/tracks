import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./reducers";
import createSagaMiddleware from 'redux-saga';
import {
  officersSaga,
  operatorsSaga,
  permitsSaga,
  reportsSaga,
  tenuresSaga,
  activitiesSaga,
  reportingPeriodsSaga, onboardingRequestsSaga
} from "./sagas";
import logger from 'redux-logger';
import authenticationSaga from "./sagas/auth";
import travelPathUploadSaga from "./sagas/travel_path_uploads";
import signupSaga from "./sagas/signup";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

// run the sagas
sagaMiddleware.run(authenticationSaga);

sagaMiddleware.run(activitiesSaga);
sagaMiddleware.run(reportsSaga);
sagaMiddleware.run(permitsSaga);
sagaMiddleware.run(tenuresSaga);
sagaMiddleware.run(operatorsSaga);
sagaMiddleware.run(officersSaga);
sagaMiddleware.run(reportingPeriodsSaga);
sagaMiddleware.run(travelPathUploadSaga);
sagaMiddleware.run(signupSaga);
sagaMiddleware.run(onboardingRequestsSaga);

export default store;
