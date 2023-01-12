-- DropForeignKey
ALTER TABLE "Vook" DROP CONSTRAINT "Vook_postPostId_fkey";

-- AlterTable
ALTER TABLE "Vook" ALTER COLUMN "postPostId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Vook" ADD CONSTRAINT "Vook_postPostId_fkey" FOREIGN KEY ("postPostId") REFERENCES "Post"("postId") ON DELETE SET NULL ON UPDATE CASCADE;
