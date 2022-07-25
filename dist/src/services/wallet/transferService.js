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
exports.transferService = void 0;
var client_1 = require("@prisma/client");
var status_codes_1 = require("http-status-codes/build/cjs/status-codes");
var http_exception_1 = __importDefault(require("../../utils/http.exception"));
var prisma = new client_1.PrismaClient();
var transferService = function (transferOrder) { return __awaiter(void 0, void 0, void 0, function () {
    var clientId, to, amount, transfer, executeTransfer;
    return __generator(this, function (_a) {
        clientId = transferOrder.clientId, to = transferOrder.to, amount = transferOrder.amount;
        transfer = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.$transaction(function (trx) { return __awaiter(void 0, void 0, void 0, function () {
                            var sender, receiver;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, trx.wallet.findUnique({
                                            where: { clientId: clientId }
                                        })];
                                    case 1:
                                        sender = _a.sent();
                                        return [4 /*yield*/, trx.wallet.findUnique({ where: { clientId: to } })];
                                    case 2:
                                        receiver = _a.sent();
                                        if (!sender) {
                                            throw new http_exception_1["default"](status_codes_1.StatusCodes.NOT_FOUND, 'Client not found');
                                        }
                                        if (!receiver) {
                                            throw new http_exception_1["default"](status_codes_1.StatusCodes.NOT_FOUND, 'Recipient not found');
                                        }
                                        if (sender.balance - amount < 0) {
                                            throw new http_exception_1["default"](status_codes_1.StatusCodes.CONFLICT, 'Not enough balance');
                                        }
                                        return [4 /*yield*/, trx.wallet.update({
                                                where: {
                                                    clientId: clientId
                                                },
                                                data: {
                                                    balance: sender.balance - amount
                                                }
                                            })];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, trx.wallet.update({
                                                where: {
                                                    clientId: to
                                                },
                                                data: {
                                                    balance: receiver.balance + amount
                                                }
                                            })];
                                    case 4:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        executeTransfer = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, transfer()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
        return [2 /*return*/, executeTransfer()["catch"](function (err) {
                throw new http_exception_1["default"](status_codes_1.StatusCodes.CONFLICT, err.message);
            })["finally"](function () {
                prisma.$disconnect();
            })];
    });
}); };
exports.transferService = transferService;
//# sourceMappingURL=transferService.js.map