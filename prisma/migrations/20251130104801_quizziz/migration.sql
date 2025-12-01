/*
  Warnings:

  - You are about to drop the `QuizCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."QuizQuestion" DROP CONSTRAINT "QuizQuestion_categoryId_fkey";

-- DropTable
DROP TABLE "public"."QuizCategory";

-- DropTable
DROP TABLE "public"."QuizQuestion";

-- CreateTable
CREATE TABLE "quiz_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'easy',

    CONSTRAINT "quiz_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_questions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "answer" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "timer" INTEGER NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quiz_categories_name_key" ON "quiz_categories"("name");

-- AddForeignKey
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "quiz_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
