import Keycloak from 'keycloak-js';
import * as React from 'react';
import {useEffect, useState, createContext} from 'react';
import '../styles/auth.scss';

const KeycloakContext = createContext({});

declare const _KEYCLOAK_REALM: string;
declare const _KEYCLOAK_CLIENT_ID: string;
declare const _KEYCLOAK_URL: string;

const AuthRequired = (props) => {
        const {children} = props;

        const [authenticated, setAuthenticated] = useState(false);

        const [keycloakInstance] = useState(Keycloak(
            {
                clientId: _KEYCLOAK_CLIENT_ID,
                realm: _KEYCLOAK_REALM,
                url: _KEYCLOAK_URL,
            }));
        useEffect(() => {
            keycloakInstance.init(
                {
                    checkLoginIframe: false,
                    onLoad: 'check-sso',
                },
            ).then((auth) => {
                setAuthenticated(auth);
            });
        }, []);

        const signin = () => {
            keycloakInstance.login();
        };

        if (authenticated) {
            return (
                <KeycloakContext.Provider value={keycloakInstance}>
                    {children}
                </KeycloakContext.Provider>
            );
        }

        return (
            <div className={'authRequired'}>
                <h1>Authentication Required</h1>
                <button
                    id={'loginButton'}
                    onClick={() => {
                        signin();
                    }}
                >
                    Authenticate
                </button>

            </div>
        );
    }
;

export default AuthRequired;
export {KeycloakContext};
