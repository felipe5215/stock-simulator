"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var exchangeRoutes_1 = __importDefault(require("./exchangeRoutes"));
var userRoutes_1 = __importDefault(require("./userRoutes"));
var walletRoutes_1 = __importDefault(require("./walletRoutes"));
var routes = (0, express_1.Router)();
routes.use('/', userRoutes_1["default"]);
routes.use('/exchange', exchangeRoutes_1["default"]);
routes.use('/wallet', walletRoutes_1["default"]);
exports["default"] = routes;
//# sourceMappingURL=index.js.map