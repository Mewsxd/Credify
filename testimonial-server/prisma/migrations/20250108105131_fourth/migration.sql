/*
  Warnings:

  - You are about to drop the `Testimonies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Testimonies" DROP CONSTRAINT "Testimonies_spaceId_fkey";

-- DropTable
DROP TABLE "Testimonies";

-- CreateTable
CREATE TABLE "Testimony" (
    "id" SERIAL NOT NULL,
    "spaceId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "social" TEXT,
    "rating" INTEGER,
    "address" TEXT,
    "company" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimony_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Testimony" ADD CONSTRAINT "Testimony_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
