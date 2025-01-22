-- CreateTable
CREATE TABLE "Spaces" (
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

    CONSTRAINT "Spaces_pkey" PRIMARY KEY ("id")
);
