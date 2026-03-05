/*
  Warnings:

  - A unique constraint covering the columns `[accessCode]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "accessCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_accessCode_key" ON "Doctor"("accessCode");
