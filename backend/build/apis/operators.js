"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operatorsList = void 0;
var tslib_1 = require("tslib");
var operatorsList = function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var operators;
        return tslib_1.__generator(this, function (_a) {
            operators = [
                { "name": "Test Operator 1", "region": "Kamloops" },
                { "name": "Test Operator 2", "region": "Kamloops" },
                { "name": "Test Operator 3", "region": "Kelowna" },
            ];
            return [2, res.status(200).send(operators)];
        });
    });
};
exports.operatorsList = operatorsList;
//# sourceMappingURL=operators.js.map