import prisma from "../db/prisma.db";
import { IComment } from "../interface/comment.interface";


export const createComment = ({
  title,
  description,
  videoId,
  userId,
}: IComment) => {
  return prisma.$transaction(async (tx) => {
    const comment = await tx.comment.create({
      data: {
        title,
        description,
      },
    });

    await tx.userComment.create({
      data: {
        userId,
        videoId,
        commentId: comment.id,
      },
    });
  });
};
