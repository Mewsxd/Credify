"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.default)();
userRouter
    .route("/")
    .get(userController_1.protect, userController_1.getUser)
    .delete(userController_1.protect, userController_1.deleteUser)
    .patch(userController_1.protect, userController_1.updateUser);
exports.default = userRouter;
