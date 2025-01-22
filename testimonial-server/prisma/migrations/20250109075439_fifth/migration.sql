/*
  Warnings:

  - Added the required column `review` to the `Testimony` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Testimony" ADD COLUMN     "review" TEXT NOT NULL;
