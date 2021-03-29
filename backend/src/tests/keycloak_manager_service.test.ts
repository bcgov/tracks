import {KeycloakManagerService} from "../services/keycloak_manager_service";

test(
  'verify can get a token', () => {
    const kms = new KeycloakManagerService();
    return kms.refreshToken();
  }
);

test(
  'verify can get this list of roles', () => {
    const kms = new KeycloakManagerService();
    return kms.getClientRoles();
  }
);

test(
  'verify can get clients', () => {
    const kms = new KeycloakManagerService();
    return kms.getClientId();
  }
)

test(
  'verify can get users by role', () => {
    const kms = new KeycloakManagerService();
    return kms.getUsersInRole('developer');
  }
)

test(
  'verify can get user', () => {
    const kms = new KeycloakManagerService();
    return kms.getUser('rob');
  }
)

test(
  'verify can get user roles', () => {
    const kms = new KeycloakManagerService();
    return kms.getClientRolesForUserByUsername('user');
  }
)

test(
  'verify can bind user to role', () => {
    const kms = new KeycloakManagerService();
    return kms.bindUserToRoleByName('rob', 'developer');
  }
)
