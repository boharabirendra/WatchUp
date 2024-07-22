import prisma from "../db/prisma.db"
import { IVideo } from "../interface/video.interface"

export const createVideo = (video: IVideo, id: number)=>{
    return prisma.$transaction(async(tx) =>{
        const cVideo  =  await tx.video.create({
            data: {
                ...video
            }
        })
        await tx.userVideo.create({
            data:{
                userId: id,
                videoId: cVideo.id
            }
        })
    })
}