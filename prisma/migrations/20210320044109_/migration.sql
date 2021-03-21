/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[username]` on the table `User`. If there are existing duplicate values, the migration will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User.email_unique` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`,
    DROP COLUMN `name`,
    ADD COLUMN     `username` VARCHAR(191) NOT NULL,
    ADD COLUMN     `password` VARCHAR(191) NOT NULL,
    ADD COLUMN     `nickname` VARCHAR(191),
    ADD COLUMN     `phone` VARCHAR(191),
    ADD COLUMN     `social` VARCHAR(191) NOT NULL DEFAULT 'LOCAL';

-- CreateIndex
CREATE UNIQUE INDEX `User.username_unique` ON `User`(`username`);
