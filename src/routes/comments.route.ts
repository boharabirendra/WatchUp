import {Router} from "express";
import { authenticate } from "../middlewares/auth.middleware";
import * as CommentService from "../services/comments.service";


const router = Router();


router.route("/create-comment").post(
    authenticate,
    CommentService.createComment
)






export default router;