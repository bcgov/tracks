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
      API_BASE: 'https://moe-tracks-dev.apps.silver.devops.gov.bc.ca',
      KEYCLOAK_CLIENT_ID: 'tracks-ui',
      KEYCLOAK_REALM: 'srmm7sdn',
      KEYCLOAK_URL: 'https://dev.oidc.gov.bc.ca/auth/'
    };
    break;
}

export {CONFIG};
