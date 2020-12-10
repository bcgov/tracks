"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
var tslib_1 = require("tslib");
var notFound = function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2, res.status(404).send()];
        });
    });
};
exports.notFound = notFound;
//# sourceMappingURL=common.js.map