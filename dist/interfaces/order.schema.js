"use strict";
exports.__esModule = true;
var zod_1 = require("zod");
var orderSchema = zod_1.z
    .object({
    clientId: zod_1.z.string(),
    amount: zod_1.z.number().positive()
})
    .strict();
exports["default"] = orderSchema;
//# sourceMappingURL=order.schema.js.map