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

export const getComments = async(videoId: number) =>{
    try {
    const comments = await CommentModel.getComments(videoId);
    if (!comments || !comments.userComment) {
        return [];
        }
    
        return comments.userComment.map(userComment => ({
        id: userComment.comment.id,
        text: userComment.comment.text,
        createdAt: userComment.comment.createdAt,
        user: {
            id: userComment.user.id,
            fullName: userComment.user.fullName,
            email: userComment.user.email,
            profileUrl: userComment.user.profileUrl
        }
        }));
    } catch (error) {
      logger.error(error);
      throw new InternalServerError("Error while fetching comments");
    }
}