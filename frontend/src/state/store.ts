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
import persistState from 'redux-sessionstorage';
import signupSaga from "./sagas/signup";

const sagaMiddleware = createSagaMiddleware();

const slicer = (paths: string[]) => {
  return (state: any) => {
    if (state.hasOwnProperty('developmentTools')) {
      return
      {
        Auth: {
          actingAs: (state.Auth !== undefined) ? state.Auth.developmentTools.actingAs : null
        }
      }
    }
    return {};
  }
}

const store = createStore(rootReducer,
  compose(applyMiddleware(sagaMiddleware, logger), persistState(null, {slicer}))
);

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
