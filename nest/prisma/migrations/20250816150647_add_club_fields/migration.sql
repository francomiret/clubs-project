/*
  Warnings:

  - Added the required column `alias` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Club" ADD COLUMN     "address" TEXT,
ADD COLUMN     "alias" TEXT NOT NULL DEFAULT 'CLUB',
ADD COLUMN     "description" TEXT,
ADD COLUMN     "foundationDate" TIMESTAMP(3),
ADD COLUMN     "image" TEXT;

-- Update existing records to have a default alias
UPDATE "public"."Club" SET "alias" = 'CLUB' WHERE "alias" IS NULL;
