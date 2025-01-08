import express from "express";
import {
  deleteUser,
  getUser,
  protect,
  updateUser,
} from "../controllers/userController";

const userRouter = express();

userRouter
  .route("/")
  .get(protect, getUser)
  .delete(protect, deleteUser)
  .patch(protect, updateUser);

export default userRouter;
