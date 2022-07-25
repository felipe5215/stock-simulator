"use strict";
exports.__esModule = true;
var zod_1 = require("zod");
var userSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
})
    .strict();
exports["default"] = userSchema;
//# sourceMappingURL=user.schema.js.map