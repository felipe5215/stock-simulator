"use strict";
exports.__esModule = true;
var errorHandler = function (error, _req, res, _next) {
    var _a;
    var status = error.status, messages = error.messages;
    res.status(status || 500).json((_a = {},
        _a[Array.isArray(error.messages) ? 'Errors' : 'Error'] = messages || 'Something went terribly wrong',
        _a));
};
exports["default"] = errorHandler;
//# sourceMappingURL=errorHandling.js.map