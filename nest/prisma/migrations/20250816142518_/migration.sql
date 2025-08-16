-- AlterTable
ALTER TABLE "public"."Activity" ALTER COLUMN "type" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Member" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Property" ALTER COLUMN "type" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Sponsor" ALTER COLUMN "updatedAt" DROP DEFAULT;
