/*
  Warnings:

  - You are about to drop the `Spaces` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Spaces";

-- CreateTable
CREATE TABLE "Space" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questions" TEXT[],
    "name" TEXT NOT NULL,
    "collectEmail" BOOLEAN NOT NULL,
    "email" TEXT,
    "collectCompany" BOOLEAN NOT NULL,
    "company" TEXT,
    "collectSocial" BOOLEAN NOT NULL,
    "social" TEXT,
    "collectAddress" BOOLEAN NOT NULL,
    "address" TEXT,
    "collectRating" BOOLEAN NOT NULL,
    "rating" INTEGER,
    "theme" BOOLEAN NOT NULL,
    "buttonColor" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
