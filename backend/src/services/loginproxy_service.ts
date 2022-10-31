import {CONFIG} from "../config";
import axios from "axios";
import * as querystring from "querystring";


class KeycloakManagerService {

    // Referenced API Doc
    // https://api.loginproxy.gov.bc.ca/openapi/swagger

    private readonly INTEGRATION_URL: string;

    private ROLE_TRANSFORMER = (role) => (
        {
            name: role.name
        }
    );

    constructor() {
        this.INTEGRATION_URL = `${CONFIG.LOGINPROXY_URL}/integrations/${CONFIG.LOGINPROXY_INTEGRATION}/${CONFIG.LOGINPROXY_ENVIRONMENT}`;
    }

    async refreshToken() {

        const tokenUrl = CONFIG.LOGINPROXY_TOKEN_URL;
        const payload = querystring.stringify({'grant_type': 'client_credentials'});

        try {
            const tokenResponse = await axios.post(tokenUrl, payload, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                auth: {
                    username: CONFIG.LOGINPROXY_SA,
                    password: CONFIG.LOGINPROXY_SA_SECRET
                }
            });
            return tokenResponse.data['access_token'];
        } catch (err) {
            console.error(err);
            throw new Error("invalid response from loginproxy");
        }

    }

    async getClientRoles() {
        const token = await this.refreshToken();
        const url = `${this.INTEGRATION_URL}/roles`;

        const response = await axios.get(url, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        const roles = response.data.data.map(this.ROLE_TRANSFORMER);

        return roles;
    }

    async getClientRoleByName(roleName: string) {
        const roles = await this.getClientRoles();
        const result = roles.find(r => r.name == roleName);
        if (!result) {
            throw new Error("no such role");
        }
        return result;
    }

    async getClientRolesForUserByUsername(username: string) {
        const token = await this.refreshToken();

        const url = `${this.INTEGRATION_URL}/user-role-mappings?username=${encodeURIComponent(username)}`;

        const response = await axios.get(url, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        return response.data.roles.map(this.ROLE_TRANSFORMER);
    }


    async bindUserToRole(username, roleName) {
        const token = await this.refreshToken();

        const url = `${this.INTEGRATION_URL}/user-role-mappings`;

        const payload = {
            roleName,
            username,
            operation: "add"
        };

        await axios.post(url,
            payload,
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
    }

    async removeUserFromRole(username, roleName) {
        const token = await this.refreshToken();

        const url = `${this.INTEGRATION_URL}/user-role-mappings`;

        const payload = {
            roleName,
            username,
            operation: "del"
        };

        await axios.post(url,
            payload,
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
    }

}

export {KeycloakManagerService};
