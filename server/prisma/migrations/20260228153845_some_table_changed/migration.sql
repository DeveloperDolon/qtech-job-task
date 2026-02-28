/*
  Warnings:

  - You are about to drop the column `userId` on the `Application` table. All the data in the column will be lost.
  - Added the required column `applicantEmail` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeLink` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobCategory" AS ENUM ('SOFTWARE_DEVELOPMENT', 'DESIGN', 'MARKETING', 'SALES', 'CUSTOMER_SUPPORT', 'HUMAN_RESOURCES');

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_userId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "userId",
ADD COLUMN     "applicantEmail" TEXT NOT NULL,
ADD COLUMN     "applicantName" TEXT NOT NULL,
ADD COLUMN     "coverLetter" TEXT,
ADD COLUMN     "resumeLink" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "category" "JobCategory" NOT NULL;
