/*
  Warnings:

  - You are about to drop the column `guestId` on the `costume` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "costume" DROP CONSTRAINT "costume_guestId_fkey";

-- AlterTable
ALTER TABLE "costume" DROP COLUMN "guestId";

-- AlterTable
ALTER TABLE "guest" ADD COLUMN     "costumeId" TEXT;

-- AddForeignKey
ALTER TABLE "guest" ADD CONSTRAINT "guest_costumeId_fkey" FOREIGN KEY ("costumeId") REFERENCES "costume"("id") ON DELETE SET NULL ON UPDATE CASCADE;
