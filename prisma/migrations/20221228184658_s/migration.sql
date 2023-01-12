/*
  Warnings:

  - You are about to drop the column `likeId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userUserId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Made the column `postId` on table `Like` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_postId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_likeId_fkey";

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "userUserId" INTEGER NOT NULL,
ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "likeId";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
