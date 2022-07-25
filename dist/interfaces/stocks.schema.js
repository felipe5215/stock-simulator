"use strict";
exports.__esModule = true;
var zod_1 = require("zod");
var stocksSchema = zod_1.z
    .object({
    clientId: zod_1.z.string(),
    assetId: zod_1.z.string(),
    assetQtty: zod_1.z.number().positive().int()
})
    .strict();
exports["default"] = stocksSchema;
//# sourceMappingURL=stocks.schema.js.map