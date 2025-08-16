/*
  Warnings:

  - Changed the type of `type` on the `Activity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Property` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."PropertyType" AS ENUM ('SPORTS_FIELD', 'GYM', 'POOL', 'TENNIS_COURT', 'SOCCER_FIELD', 'BASKETBALL_COURT', 'TRACK', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ActivityType" AS ENUM ('TRAINING', 'COMPETITION', 'TOURNAMENT', 'WORKSHOP', 'CLASS', 'EVENT', 'MEETING', 'OTHER');

-- DropForeignKey
ALTER TABLE "public"."Activity" DROP CONSTRAINT "Activity_clubId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Member" DROP CONSTRAINT "Member_clubId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_clubId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Property" DROP CONSTRAINT "Property_clubId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Sponsor" DROP CONSTRAINT "Sponsor_clubId_fkey";

-- AlterTable
ALTER TABLE "public"."Activity" DROP COLUMN "type",
ADD COLUMN     "type" "public"."ActivityType" NOT NULL DEFAULT 'OTHER';

-- AlterTable
ALTER TABLE "public"."Member" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Property" DROP COLUMN "type",
ADD COLUMN     "type" "public"."PropertyType" NOT NULL DEFAULT 'OTHER';

-- AlterTable
ALTER TABLE "public"."Sponsor" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "public"."Member" ADD CONSTRAINT "Member_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "public"."Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sponsor" ADD CONSTRAINT "Sponsor_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "public"."Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "public"."Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "public"."Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "public"."Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
