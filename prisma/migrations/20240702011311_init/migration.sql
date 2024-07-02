/*
  Warnings:

  - A unique constraint covering the columns `[student_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "student_id" TEXT NOT NULL,
    "school_year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "chinese_score" INTEGER NOT NULL,
    "math_score" INTEGER NOT NULL,
    "english_score" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Score_student_id_key" ON "Score"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_student_id_key" ON "User"("student_id");
