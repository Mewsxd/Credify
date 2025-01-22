import express from "express";
// import { protect } from "../controllers/userController";
import {
  createTestimony,
  getTestimony,
} from "../controllers/testimonyController";

const testimonyRouter = express.Router();

testimonyRouter.post("/", createTestimony);
testimonyRouter.get("/:spaceId", getTestimony);
export default testimonyRouter;
