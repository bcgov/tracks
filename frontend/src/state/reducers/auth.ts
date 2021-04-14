import {keycloakInstance} from "../sagas/auth";
import {AUTH_INITIALIZE_COMPLETE, AUTH_REQUEST_COMPLETE, AUTH_UPDATE_TOKEN_STATE} from "../actions";

class AuthState {
  initialized: boolean;
  loading: boolean;
  error: boolean;
  authenticated: true;

  username: string;
  idir: boolean;

  bestName: string;
  requestHeaders: {
    authorization: string;
  };
  roles: string[];

  constructor() {
    this.initialized = false;
    this.roles = [];
  }
}

const initialState = new AuthState();

function loadCurrentStateFromKeycloak(previousState: AuthState): object {

  let bestName = 'User';
  const preferenceOrder = ['name', 'preferred_username', 'given_name', 'sub'];

  for (const p of preferenceOrder) {
    if (keycloakInstance.idTokenParsed) {
      if ((p in keycloakInstance.idTokenParsed) &&
        (keycloakInstance.idTokenParsed[p] !== null) &&
        (keycloakInstance.idTokenParsed[p].length > 0)) {
        bestName = keycloakInstance.idTokenParsed[p];
        break;
      }
    }
  }
  let username = null;
  let idir = false;

  if (keycloakInstance.idTokenParsed) {
    username = keycloakInstance.idTokenParsed['preferred_username'];
    idir = username.toLowerCase().endsWith('@idir');
  }

  let roles = [];
  if (keycloakInstance.resourceAccess != null) {
    if (keycloakInstance.resourceAccess['tracks-ui'] !== undefined) {
      roles = keycloakInstance.resourceAccess['tracks-ui'].roles;
    }
  }
  const headers = {
    authorization: `Bearer ${keycloakInstance.idToken}`
  };

  return {
    bestName,
    headers,
    roles,
    username,
    idir
  };

}

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_INITIALIZE_COMPLETE: {
      const {authenticated} = action.payload;
      return {
        ...state,
        initialized: true,
        authenticated,
        ...loadCurrentStateFromKeycloak(state)
      }
    }
    case AUTH_REQUEST_COMPLETE: {
      const {authenticated} = action.payload;
      return {
        ...state,
        authenticated,
        ...loadCurrentStateFromKeycloak(state)
      }
    }
    case AUTH_UPDATE_TOKEN_STATE: {
      return {
        ...state,
        ...loadCurrentStateFromKeycloak(state)
      }
    }
    default:
      return state;
  }
};

export {Auth};
