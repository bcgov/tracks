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

	// potentially webpack-injected, depending on mode
	const _DEBUG: boolean;
	const _API_BASE: string;
	const _KEYCLOAK_CLIENT_ID: string;
	const _KEYCLOAK_REALM: string;
	const _KEYCLOAK_URL: string;
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
	case 'Webpack':
	default:
		CONFIG = {
			DEBUG: true,
			API_BASE: _API_BASE,
			KEYCLOAK_CLIENT_ID: _KEYCLOAK_CLIENT_ID,
			KEYCLOAK_REALM: _KEYCLOAK_REALM,
			KEYCLOAK_URL: _KEYCLOAK_URL
		};
		break;
}

export {CONFIG};
