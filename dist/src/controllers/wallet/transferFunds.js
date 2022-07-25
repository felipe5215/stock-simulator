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
exports.transferFunds = void 0;
var http_status_codes_1 = require("http-status-codes");
var zod_1 = require("zod");
var transfer_schema_1 = __importDefault(require("../../interfaces/transfer.schema"));
var checkBalance_1 = require("../../services/wallet/checkBalance");
var transferService_1 = require("../../services/wallet/transferService");
var zod_exception_1 = __importDefault(require("../../utils/zod.exception"));
var transferFunds = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var transferInfo, newBalance, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transferInfo = req.body;
                try {
                    transfer_schema_1["default"].parse(transferInfo);
                }
                catch (e) {
                    if (e instanceof zod_1.z.ZodError) {
                        return [2 /*return*/, next(new zod_exception_1["default"](http_status_codes_1.StatusCodes.CONFLICT, e.issues))];
                    }
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, transferService_1.transferService)(transferInfo)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, checkBalance_1.checkBalance)(transferInfo.clientId)];
            case 3:
                newBalance = _a.sent();
                res.json({
                    message: "You transferred R$ ".concat(transferInfo.amount, " to ").concat(transferInfo.to),
                    balance: "Your new balance is R$ ".concat(newBalance.balance)
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.transferFunds = transferFunds;
//# sourceMappingURL=transferFunds.js.map