import {all, put, takeLatest} from 'redux-saga/effects'

import Keycloak from "keycloak-js";
import {
  AUTH_INITIALIZE_COMPLETE,
  AUTH_INITIALIZE_REQUEST,
  AUTH_REQUEST_COMPLETE,
  AUTH_REQUEST_ERROR,
  AUTH_SIGNIN_REQUEST
} from "../actions";

declare const _KEYCLOAK_REALM: string;
declare const _KEYCLOAK_CLIENT_ID: string;
declare const _KEYCLOAK_URL: string;

const keycloakInstance = Keycloak(
  {
    clientId: _KEYCLOAK_CLIENT_ID,
    realm: _KEYCLOAK_REALM,
    url: _KEYCLOAK_URL,
  });

function* initializeAuthentication() {
  const authStatus = yield keycloakInstance.init(
    {
      checkLoginIframe: false,
      onLoad: 'check-sso',
    }
  );

  yield put({
    type: AUTH_INITIALIZE_COMPLETE,
    payload: {
      authenticated: authStatus
    }
  });
}

function* handleSigninRequest(action) {
  try {
    const newVar = yield keycloakInstance.login();
    console.dir(newVar);

    yield put({type: AUTH_REQUEST_COMPLETE, payload: {}});
  } catch (e) {
    yield put({type: AUTH_REQUEST_ERROR});
  }
}

function* authenticationSaga() {
  yield all([takeLatest(AUTH_INITIALIZE_REQUEST, initializeAuthentication),
    takeLatest(AUTH_SIGNIN_REQUEST, handleSigninRequest)]);
}

export default authenticationSaga;
export {keycloakInstance};
