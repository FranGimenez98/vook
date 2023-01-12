/*
  Warnings:

  - You are about to drop the column `userUserId` on the `Follows` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_userUserId_fkey";

-- AlterTable
ALTER TABLE "Follows" DROP COLUMN "userUserId";
