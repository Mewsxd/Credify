import express from "express";
import { signIn, signUp } from "../controllers/authController";

const authRouter = express();

authRouter.post("/signIn", signIn);
authRouter.post("/signUp", signUp);

export default authRouter;
