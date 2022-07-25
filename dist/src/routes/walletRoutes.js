"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var getAssetsByClient_1 = require("../controllers/wallet/getAssetsByClient");
var getBalanceById_1 = require("../controllers/wallet/getBalanceById");
var makeDeposit_1 = require("../controllers/wallet/makeDeposit");
var makeWithdraw_1 = require("../controllers/wallet/makeWithdraw");
var transferFunds_1 = require("../controllers/wallet/transferFunds");
var validateParams_1 = __importDefault(require("../middlewares/validateParams"));
var walletRoutes = (0, express_1.Router)();
walletRoutes.get('/:id', validateParams_1["default"], getBalanceById_1.getBalanceById);
walletRoutes.get('/assets/:id', validateParams_1["default"], getAssetsByClient_1.getAssetsByClientId);
walletRoutes.post('/withdraw', makeWithdraw_1.makeWithdraw);
walletRoutes.post('/deposit', makeDeposit_1.makeDeposit);
walletRoutes.post('/transfer', transferFunds_1.transferFunds);
exports["default"] = walletRoutes;
//# sourceMappingURL=walletRoutes.js.map