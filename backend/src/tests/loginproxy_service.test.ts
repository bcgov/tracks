import {KeycloakManagerService} from "../services/loginproxy_service";

jest.setTimeout(30 * 1000);

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
    'verify can get user roles', () => {
        const kms = new KeycloakManagerService();
        return kms.getClientRolesForUserByUsername(process.env.TEST_SUBJECT);
    }
)

test(
    'verify can bind user to role', () => {
        const kms = new KeycloakManagerService();
        return kms.bindUserToRole(process.env.TEST_SUBJECT, 'area_admin');
    }
)

test(
    'verify can remove user from role', () => {
        const kms = new KeycloakManagerService();
        return kms.removeUserFromRole(process.env.TEST_SUBJECT, 'area_admin');
    }
)