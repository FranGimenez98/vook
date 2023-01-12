/*
  Warnings:

  - The primary key for the `Followings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followingsId` on the `Followings` table. All the data in the column will be lost.
  - You are about to drop the `Followers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Followers" DROP CONSTRAINT "Followers_userUserId_fkey";

-- AlterTable
ALTER TABLE "Followings" DROP CONSTRAINT "Followings_pkey",
DROP COLUMN "followingsId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Followings_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Followers";
