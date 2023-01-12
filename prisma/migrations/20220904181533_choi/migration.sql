/*
  Warnings:

  - You are about to drop the column `accountUserId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_accountUserId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountUserId";

-- DropTable
DROP TABLE "Account";
