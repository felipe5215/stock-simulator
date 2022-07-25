"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_status_codes_1 = require("http-status-codes");
var http_exception_1 = __importDefault(require("../utils/http.exception"));
var tokenUtils_1 = require("../utils/tokenUtils");
var validateBody = function (req, _res, next) {
    var authorization = req.headers.authorization;
    var clientId = req.body.clientId;
    if (!authorization) {
        throw new http_exception_1["default"](http_status_codes_1.StatusCodes.FORBIDDEN, 'Token not provided');
    }
    (0, tokenUtils_1.verifyToken)(authorization);
    var clientIdFromToken = (0, tokenUtils_1.decodeToken)(authorization);
    if (clientId !== clientIdFromToken) {
        throw new http_exception_1["default"](http_status_codes_1.StatusCodes.FORBIDDEN, 'Invalid token');
    }
    next();
};
exports["default"] = validateBody;
//# sourceMappingURL=validateBody.js.map