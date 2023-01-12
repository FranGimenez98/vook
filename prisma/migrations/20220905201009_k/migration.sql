/*
  Warnings:

  - Added the required column `userUserId` to the `Follows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Follows" ADD COLUMN     "userUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
