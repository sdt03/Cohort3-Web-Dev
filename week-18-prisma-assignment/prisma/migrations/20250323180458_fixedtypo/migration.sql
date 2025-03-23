/*
  Warnings:

  - You are about to drop the column `destinaitonCountry` on the `Travel` table. All the data in the column will be lost.
  - Added the required column `destinationCountry` to the `Travel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Travel" DROP COLUMN "destinaitonCountry",
ADD COLUMN     "destinationCountry" TEXT NOT NULL;
