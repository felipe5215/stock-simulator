"use strict";
exports.__esModule = true;
var zod_1 = require("zod");
var transferSchema = zod_1.z
    .object({
    clientId: zod_1.z.string(),
    to: zod_1.z.string(),
    amount: zod_1.z.number().positive()
})
    .strict();
exports["default"] = transferSchema;
//# sourceMappingURL=transfer.schema.js.map