/*
  Warnings:

  - Added the required column `imagePublicId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoPublicId` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "imagePublicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "videoPublicId" TEXT NOT NULL;
