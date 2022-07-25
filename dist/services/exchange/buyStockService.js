"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.buyStocksService = void 0;
var client_1 = require("@prisma/client");
var http_status_codes_1 = require("http-status-codes");
var http_exception_1 = __importDefault(require("../../utils/http.exception"));
var checkBalance_1 = require("../wallet/checkBalance");
var getAssetByIdService_1 = require("./getAssetByIdService");
var prisma = new client_1.PrismaClient();
var buyStocksService = function (order) { return __awaiter(void 0, void 0, void 0, function () {
    var exchangeStock, totalCost, clientBalance, checkIfClientHasAsset, stockTransaction;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, getAssetByIdService_1.getAssetByIdService)(order.assetId)];
            case 1:
                exchangeStock = _a.sent();
                totalCost = exchangeStock.value * order.assetQtty;
                if (exchangeStock.assetQtty < order.assetQtty) {
                    throw new http_exception_1["default"](http_status_codes_1.StatusCodes.CONFLICT, 'Not enough stocks available on exchange');
                }
                return [4 /*yield*/, (0, checkBalance_1.checkBalance)(order.clientId)];
            case 2:
                clientBalance = _a.sent();
                if (!clientBalance) {
                    throw new http_exception_1["default"](http_status_codes_1.StatusCodes.NOT_FOUND, 'Client not found');
                }
                if (clientBalance.balance < totalCost) {
                    throw new http_exception_1["default"](http_status_codes_1.StatusCodes.CONFLICT, 'Client does not have enough funds');
                }
                return [4 /*yield*/, prisma.holdings.findFirst({
                        where: {
                            clientId: order.clientId,
                            assetId: order.assetId
                        }
                    })];
            case 3:
                checkIfClientHasAsset = _a.sent();
                stockTransaction = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prisma.$transaction(function (trx) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, trx.wallet.update({
                                                    where: {
                                                        clientId: order.clientId
                                                    },
                                                    data: {
                                                        balance: clientBalance.balance - totalCost
                                                    }
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, trx.stocks.update({
                                                        where: {
                                                            assetId: order.assetId
                                                        },
                                                        data: {
                                                            assetQtty: exchangeStock.assetQtty - order.assetQtty
                                                        }
                                                    })];
                                            case 2:
                                                _a.sent();
                                                if (!checkIfClientHasAsset) return [3 /*break*/, 4];
                                                return [4 /*yield*/, trx.holdings.update({
                                                        where: {
                                                            clientId_assetId: {
                                                                clientId: order.clientId,
                                                                assetId: order.assetId
                                                            }
                                                        },
                                                        data: {
                                                            assetQtty: checkIfClientHasAsset.assetQtty + order.assetQtty
                                                        }
                                                    })];
                                            case 3:
                                                _a.sent();
                                                return [3 /*break*/, 6];
                                            case 4: return [4 /*yield*/, trx.holdings.create({
                                                    data: {
                                                        clientId: order.clientId,
                                                        assetId: order.assetId,
                                                        assetQtty: order.assetQtty
                                                    }
                                                })];
                                            case 5:
                                                _a.sent();
                                                _a.label = 6;
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); };
                return [4 /*yield*/, stockTransaction()["catch"](function (err) {
                        throw new http_exception_1["default"](http_status_codes_1.StatusCodes.SERVICE_UNAVAILABLE, err.message);
                    })["finally"](function () {
                        prisma.$disconnect();
                    })];
            case 4: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.buyStocksService = buyStocksService;
//# sourceMappingURL=buyStockService.js.map