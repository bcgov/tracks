"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var cors_1 = tslib_1.__importDefault(require("cors"));
var http_1 = tslib_1.__importDefault(require("http"));
var helmet_1 = tslib_1.__importDefault(require("helmet"));
var express_1 = tslib_1.__importDefault(require("express"));
var morgan_1 = tslib_1.__importDefault(require("morgan"));
var common_1 = require("./apis/common");
var operators_1 = require("./apis/operators");
var prefix = '/api/v1';
var app = express_1.default()
    .use(helmet_1.default())
    .use(cors_1.default())
    .use(morgan_1.default('tiny'))
    .get(prefix + "/operators", operators_1.operatorsList)
    .get('*', common_1.notFound);
http_1.default.createServer(app).listen(6005, function () {
    console.log("listening on port 6005");
});
//# sourceMappingURL=server.js.map