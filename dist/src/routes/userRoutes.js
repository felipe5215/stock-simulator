"use strict";
exports.__esModule = true;
var express_1 = require("express");
var createUser_1 = require("../controllers/user/createUser");
var userLogin_1 = require("../controllers/user/userLogin");
var userRoutes = (0, express_1.Router)();
userRoutes.post('/createUser', createUser_1.createUserController);
userRoutes.post('/login', userLogin_1.userLogin);
exports["default"] = userRoutes;
//# sourceMappingURL=userRoutes.js.map