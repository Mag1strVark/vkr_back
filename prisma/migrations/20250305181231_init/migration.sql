/*
  Warnings:

  - Added the required column `code` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correctAnswer` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "correctAnswer" JSONB NOT NULL;
