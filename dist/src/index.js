"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("./app"));
var PORT = process.env.PORT || 3000;
app_1["default"].listen(PORT, function () {
    console.log("Server is running on ".concat(PORT));
});
//# sourceMappingURL=index.js.map