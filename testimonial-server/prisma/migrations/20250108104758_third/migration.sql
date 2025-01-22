/*
  Warnings:

  - You are about to drop the column `address` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `social` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "address",
DROP COLUMN "company",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "rating",
DROP COLUMN "social";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Testimonies" (
    "id" SERIAL NOT NULL,
    "spaceId" INTEGER NOT NULL,
    "email" TEXT,
    "social" TEXT,
    "rating" INTEGER,
    "address" TEXT,
    "company" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Testimonies" ADD CONSTRAINT "Testimonies_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
