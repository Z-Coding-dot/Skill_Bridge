/*
  Warnings:

  - You are about to drop the column `type` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "type",
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL;
