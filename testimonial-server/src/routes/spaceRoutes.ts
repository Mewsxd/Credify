import express from "express";
import {
  createSpace,
  getSpaces,
  getSpaceById,
  updateSpace,
  deleteSpace,
} from "../controllers/spaceController";
import { protect } from "../controllers/userController";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const spaceRouter = express.Router();

spaceRouter
  .route("/")
  .post(protect, upload.single("image"), createSpace)
  .get(getSpaces);
spaceRouter
  .route("/:id")
  .patch(updateSpace)
  .get(getSpaceById)
  .delete(deleteSpace);
export default spaceRouter;
