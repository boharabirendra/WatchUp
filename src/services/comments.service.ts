import * as CommentModel from "../models/comments.models";
import { IComment } from "../interface/comment.interface";
import loggerWithNameSpace from "../utils/logger.utils";
import { InternalServerError } from "../errors/error.error";


const logger = loggerWithNameSpace("Like Service");

export const createComment = async(comment: IComment) =>{
    try {
        await CommentModel.createComment(comment);
    } catch (error) {
        logger.error(error);
        throw new InternalServerError("Error while adding comment");
    }
}