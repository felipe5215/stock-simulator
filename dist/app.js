"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var errorHandling_1 = __importDefault(require("./middlewares/errorHandling"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use(routes_1["default"]);
app.use(errorHandling_1["default"]);
exports["default"] = app;
//# sourceMappingURL=app.js.map