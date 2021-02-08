import {keycloakInstance} from "../sagas/auth";
import CONFIG from "../../config";
import {AUTH_ACT_AS, AUTH_INITIALIZE_COMPLETE, AUTH_REQUEST_COMPLETE, AUTH_UPDATE_TOKEN_STATE} from "../actions";


class Actor {
  username: string;
  name: string;

  organization: {
    name: string;
    id: number;
  };

  roles: string[];

  constructor(username: string, name: string, organization: { name: string; id: number }, roles: string[]) {
    this.username = username;
    this.name = name;
    this.organization = organization;
    this.roles = roles;
  }
}

class AuthState {
  initialized: boolean;
  loading: boolean;
  error: boolean;
  authenticated: true;

  developmentTools: {
    actingAs: Actor;
    availableActors: Actor[];
  } | null;

  bestName: string;
  requestHeaders: {
    authorization: string;
  };
  roles: string[];

  constructor() {
    this.initialized = false;
    this.roles = [];

    if (CONFIG.DEVELOPMENT_MODE) {
      this.developmentTools = {
        availableActors: [
          new Actor('admin', 'System Administrator', {
            name: 'Government of British Columbia',
            id: 1
          }, ['admin']),
          new Actor('area_admin', 'Area Administrator', {
            name: 'Government of British Columbia',
            id: 1
          }, ['area_admin']),
          new Actor('license_auth_officer', 'License Authorization Officer', {
            name: 'Government of British Columbia',
            id: 1
          }, ['license_auth_officer']),
          new Actor('cr1e1', 'CR1 Employee 1', {name: 'Demo Commercial Operator 1', id: 2}, ['commercial_operator']),
          new Actor('cr1e2', 'CR1 Employee 2', {name: 'Demo Commercial Operator 1', id: 2}, ['commercial_operator']),
          new Actor('cr2e1', 'CR2 Employee 1', {name: 'Demo Commercial Operator 2', id: 3}, ['commercial_operator']),

          new Actor('co1', 'Conservation Officer 1', {
            name: 'Government of British Columbia',
            id: 1
          }, ['conservation_officer']),

          new Actor('co2', 'Conservation Officer 2', {
            name: 'Government of British Columbia',
            id: 1
          }, ['conservation_officer']),
        ],
        actingAs: null
      }
    }
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

  let roles = [];
  if (keycloakInstance.resourceAccess != null) {
    if (keycloakInstance.resourceAccess['tracks-web'] !== undefined) {
      roles = keycloakInstance.resourceAccess['tracks-web'].roles;
    }
  }

  if (CONFIG.DEVELOPMENT_MODE && previousState.developmentTools?.actingAs !== null) {
    roles = previousState.developmentTools.actingAs.roles;
  }

  const headers = {
    authorization: `Bearer ${keycloakInstance.idToken}`
  };

  if (CONFIG.DEVELOPMENT_MODE && previousState.developmentTools.actingAs != null) {
    headers['X-Subject-Override'] = previousState.developmentTools.actingAs.username;
    headers['X-Roles-Override'] = previousState.developmentTools.actingAs.roles.join(' ');
  }

  return {
    bestName,
    headers,
    roles
  };

}

//@todo keep token fresh

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
    case AUTH_ACT_AS: {
      const {actor} = action.payload;

      const modifiedState: AuthState = {
        ...state,
        developmentTools: {
          ...state.developmentTools,
          actingAs: actor
        },
      }

      return {
        ...modifiedState,
        ...loadCurrentStateFromKeycloak(modifiedState)
      };

    }
    default:
      return state;
  }
};

export {Auth};
