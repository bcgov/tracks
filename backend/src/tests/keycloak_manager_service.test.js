"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keycloak_manager_service_1 = require("../services/keycloak_manager_service");
test('verify can get a token', function () {
    var kms = new keycloak_manager_service_1.KeycloakManagerService();
    return kms.refreshToken();
});
