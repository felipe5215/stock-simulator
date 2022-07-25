"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.decodeToken = exports.verifyToken = exports.createToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var http_exception_1 = __importDefault(require("./http.exception"));
var secret = 'nn19y13b8937b1f983b7f1';
var jwtConfig = {
    algorithm: 'HS256'
};
var createToken = function (clientId) {
    return jsonwebtoken_1["default"].sign(clientId, secret, jwtConfig);
};
exports.createToken = createToken;
var verifyToken = function (token) {
    try {
        var user = jsonwebtoken_1["default"].verify(token, secret, jwtConfig);
        return user;
    }
    catch (err) {
        throw new http_exception_1["default"](401, 'Invalid token');
    }
};
exports.verifyToken = verifyToken;
var decodeToken = function (token) {
    try {
        var user = jsonwebtoken_1["default"].decode(token);
        return user;
    }
    catch (err) {
        throw new http_exception_1["default"](401, 'Invalid token');
    }
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=tokenUtils.js.map