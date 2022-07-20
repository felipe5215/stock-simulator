/*
  Warnings:

  - You are about to drop the column `Saldo` on the `Wallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Wallet` DROP COLUMN `Saldo`,
    ADD COLUMN `balance` DOUBLE NOT NULL DEFAULT 999.99;
