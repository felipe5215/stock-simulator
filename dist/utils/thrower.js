"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_exception_1 = __importDefault(require("./http.exception"));
var Thrower = /** @class */ (function () {
    function Thrower(param) {
        throw new http_exception_1["default"](400, "".concat(param, " is required"));
    }
    return Thrower;
}());
exports["default"] = Thrower;
//# sourceMappingURL=thrower.js.map