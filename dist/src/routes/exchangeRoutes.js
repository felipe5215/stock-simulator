"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var buyStocks_1 = require("../controllers/exchange/buyStocks");
var getAllAssets_1 = require("../controllers/exchange/getAllAssets");
var getAssetsById_1 = require("../controllers/exchange/getAssetsById");
var sellStocks_1 = require("../controllers/exchange/sellStocks");
var validateBody_1 = __importDefault(require("../middlewares/validateBody"));
var exchangeRoutes = (0, express_1.Router)();
exchangeRoutes.get('/assets', getAllAssets_1.getAllAssets);
exchangeRoutes.get('/assets/:assetId', getAssetsById_1.getAssetById);
exchangeRoutes.use(validateBody_1["default"]);
exchangeRoutes.post('/buy', buyStocks_1.buyStocks);
exchangeRoutes.post('/sell', sellStocks_1.sellStocks);
exports["default"] = exchangeRoutes;
//# sourceMappingURL=exchangeRoutes.js.map