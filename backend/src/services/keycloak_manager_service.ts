import {CONFIG} from "../config";
import axios from "axios";
import * as querystring from "querystring";


class KeycloakManagerService {
  private readonly KEYCLOAK_REALM_BASE: string;
  private readonly KEYCLOAK_ADMIN_BASE: string;
  private CACHED_CLIENT_ID = null;

  private ROLE_TRANSFORMER = (role) => (
    {
      id: role.id,
      name: role.name
    }
  );

  private USER_TRANSFORMER = (user) => (
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      active: user.enabled,
      username: user.username
    }
  );

  constructor() {
    this.KEYCLOAK_REALM_BASE = `${CONFIG.KEYCLOAK_BASE_URL}/auth/realms/${CONFIG.KEYCLOAK_REALM}`;
    this.KEYCLOAK_ADMIN_BASE = `${CONFIG.KEYCLOAK_BASE_URL}/auth/admin/realms/${CONFIG.KEYCLOAK_REALM}`;
  }

  async refreshToken() {

    const tokenUrl = `${this.KEYCLOAK_REALM_BASE}/protocol/openid-connect/token`;
    const payload = querystring.stringify({'grant_type': 'client_credentials'});

    try {
      const tokenResponse = await axios.post(tokenUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: CONFIG.KEYCLOAK_SA,
          password: CONFIG.KEYCLOAK_SA_SECRET
        }
      });
      return tokenResponse.data['access_token'];
    } catch (err) {
      throw new Error("invalid response from keycloak");
    }

  }

  async getClientId() {
    if (this.CACHED_CLIENT_ID !== null)
      return this.CACHED_CLIENT_ID;

    const token = await this.refreshToken();
    const url = `${this.KEYCLOAK_ADMIN_BASE}/clients`;
    const response = await axios.get(url,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

    const allClients = response.data;
    const client = allClients.find(c => c.clientId === CONFIG.KEYCLOAK_CLIENT);
    if (!client) {
      throw new Error('Client ID not found');
    }

    this.CACHED_CLIENT_ID = client.id;

    return client.id;

  }

  async getClientRoles() {
    const token = await this.refreshToken();
    const url = `${this.KEYCLOAK_ADMIN_BASE}/clients/${await this.getClientId()}/roles`;

    const response = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    const roles = response.data.map(this.ROLE_TRANSFORMER);
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

  async getUsersInRole(roleName: string) {
    const token = await this.refreshToken();
    const url = `${this.KEYCLOAK_ADMIN_BASE}/clients/${await this.getClientId()}/roles/${roleName}/users`;
    const response = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    const users = response.data.map(this.USER_TRANSFORMER);
    return users;
  }

  async getUserById(id: string) {

    const token = await this.refreshToken();

    const url = `${this.KEYCLOAK_ADMIN_BASE}/users/${id}`;
    const response = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    return this.USER_TRANSFORMER(response.data);

  }

  async getUser(username: string) {
    const token = await this.refreshToken();
    const query = querystring.stringify({
      username: username
    });

    const url = `${this.KEYCLOAK_ADMIN_BASE}/users/?${query}`;
    const response = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    if (response.data.length == 0) {
      throw new Error("No results")
    } else if (response.data.length > 1) {
      throw new Error("Too many results");
    }

    return response.data.map(this.USER_TRANSFORMER)[0];
  }


  async getClientRolesForUserByUsername(username: string) {
    const {id} = await this.getUser(username);
    return this.getClientRolesForUserById(id);
  }

  async getClientRolesForUserById(id: string) {
    const token = await this.refreshToken();

    const url = `${this.KEYCLOAK_ADMIN_BASE}/users/${id}/role-mappings/clients/${await this.getClientId()}`;

    const response = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    return response.data.map(this.ROLE_TRANSFORMER);
  }

  async bindUserToRoleByName(username, roleName) {
    const user = await this.getUser(username);

    return this.bindUserToRole(user.id, roleName);
  }

  async bindUserToRole(userId, roleName) {
    const token = await this.refreshToken();
    const role = await this.getClientRoleByName(roleName);

    const url = `${this.KEYCLOAK_ADMIN_BASE}/users/${userId}/role-mappings/clients/${await this.getClientId()}`;

    const payload = [
      {id: role.id, name: role.name}
    ];

    console.dir(url);
    console.dir(payload);

    await axios.post(url,
      payload,{
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }

}

export {KeycloakManagerService};
