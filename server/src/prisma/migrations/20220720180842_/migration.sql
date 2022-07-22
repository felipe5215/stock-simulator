-- CreateTable
CREATE TABLE `User` (
    `clientId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_clientId_key`(`clientId`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`clientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stocks` (
    `assetId` VARCHAR(191) NOT NULL,
    `assetName` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `assetQtty` INTEGER NOT NULL DEFAULT 999,

    UNIQUE INDEX `Stocks_assetId_key`(`assetId`),
    UNIQUE INDEX `Stocks_assetName_key`(`assetName`),
    PRIMARY KEY (`assetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallet` (
    `walletId` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `balance` DOUBLE NOT NULL,

    UNIQUE INDEX `Wallet_walletId_key`(`walletId`),
    UNIQUE INDEX `Wallet_clientId_key`(`clientId`),
    PRIMARY KEY (`walletId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Holdings` (
    `holdingId` VARCHAR(191) NOT NULL,
    `assetQtty` INTEGER NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `assetId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`holdingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`clientId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Holdings` ADD CONSTRAINT `Holdings_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`clientId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Holdings` ADD CONSTRAINT `Holdings_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Stocks`(`assetId`) ON DELETE RESTRICT ON UPDATE CASCADE;
