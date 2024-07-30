import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import * as CommentController from "../controllers/comments.controller";
import { commentBodyParser } from "../middlewares/multer.middleware";

const router = Router();

router
  .route("/create-comment")
  .post(authenticate, commentBodyParser, CommentController.createComment);

router
  .route("/get-comments/:videoId")
  .get(CommentController.getComments);

export default router;
