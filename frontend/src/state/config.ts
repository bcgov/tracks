export interface TracksConfig {
  DEBUG: boolean;
  API_BASE: string;
  KEYCLOAK_CLIENT_ID: string;
  KEYCLOAK_REALM: string;
  KEYCLOAK_URL: string;
}

/* global CONFIGURATION_SOURCE */
declare global {
  const CONFIGURATION_SOURCE: string;
}

let CONFIG: TracksConfig;

switch (CONFIGURATION_SOURCE) {
  case 'Caddy':
    CONFIG = {
      DEBUG: false,
      API_BASE: '{{env "API_BASE"}}',
      KEYCLOAK_CLIENT_ID: '{{env "KEYCLOAK_CLIENT_ID"}}',
      KEYCLOAK_REALM: '{{env "KEYCLOAK_REALM"}}',
      KEYCLOAK_URL: '{{env "KEYCLOAK_URL"}}',
    };
    break;
  case 'Hardcoded':
  default:
    CONFIG = {
      DEBUG: true,
      API_BASE: 'http://localhost:6005',
      KEYCLOAK_CLIENT_ID: 'tracks-ui',
      KEYCLOAK_REALM: 'tracks',
      KEYCLOAK_URL: 'http://localhost:8080/auth'
    };
    break;
}

export {CONFIG};
