"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authRouter = (0, express_1.default)();
authRouter.post("/signIn", authController_1.signIn);
authRouter.post("/signUp", authController_1.signUp);
exports.default = authRouter;
