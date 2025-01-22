import express from "express";
import {
  createSpace,
  getSpaces,
  getSpaceById,
  updateSpace,
  deleteSpace,
} from "../controllers/spaceController";
import { protect } from "../controllers/userController";

const spaceRouter = express.Router();

spaceRouter.route("").post(protect, createSpace).get(getSpaces);
spaceRouter
  .route("/:id")
  .patch(updateSpace)
  .get(getSpaceById)
  .delete(deleteSpace);

export default spaceRouter;
