import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducers";
import createSagaMiddleware from 'redux-saga';
import {officersSaga, operatorsSaga, permitsSaga, reportsSaga, tenuresSaga, travelPathsSaga} from "./sagas";
import logger from 'redux-logger';
import authenticationSaga from "./sagas/auth";

const sagaMiddleware = createSagaMiddleware();


const store = createStore(rootReducer,
  applyMiddleware(sagaMiddleware, logger)
);

// run the sagas
sagaMiddleware.run(authenticationSaga);

sagaMiddleware.run(travelPathsSaga);
sagaMiddleware.run(reportsSaga);
sagaMiddleware.run(permitsSaga);
sagaMiddleware.run(tenuresSaga);
sagaMiddleware.run(operatorsSaga);
sagaMiddleware.run(officersSaga);

export default store;
