-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountUserId" INTEGER;

-- CreateTable
CREATE TABLE "Account" (
    "userId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "bannerPic" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accountUserId_fkey" FOREIGN KEY ("accountUserId") REFERENCES "Account"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
