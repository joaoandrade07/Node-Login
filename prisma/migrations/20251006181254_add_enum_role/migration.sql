/*
  Warnings:

  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `name` VARCHAR(255) NOT NULL,
    MODIFY `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';
