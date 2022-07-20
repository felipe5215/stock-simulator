-- CreateTable
CREATE TABLE `User` (
    `clientId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`clientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stocks` (
    `assetId` VARCHAR(191) NOT NULL,
    `assetName` VARCHAR(191) NOT NULL,
    `Valor` DOUBLE NOT NULL,
    `assetQtty` INTEGER NOT NULL DEFAULT 999,

    PRIMARY KEY (`assetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallet` (
    `walletId` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `Saldo` DOUBLE NOT NULL DEFAULT 999.99,

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
