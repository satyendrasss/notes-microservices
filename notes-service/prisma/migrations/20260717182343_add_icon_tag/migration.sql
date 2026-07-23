/*
  Warnings:

  - You are about to drop the column `color` on the `tags` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tags" DROP COLUMN "color",
ADD COLUMN     "icon" TEXT;
