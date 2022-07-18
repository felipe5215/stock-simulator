-- CreateTable
CREATE TABLE `User` (
    `CodCliente` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CodCliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stocks` (
    `CodAtivo` INTEGER NOT NULL AUTO_INCREMENT,
    `NomeAtivo` VARCHAR(191) NOT NULL,
    `Valor` DOUBLE NOT NULL,

    PRIMARY KEY (`CodAtivo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CodCliente` INTEGER NOT NULL,
    `Saldo` DOUBLE NOT NULL DEFAULT 999.99,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Holdings` (
    `id` VARCHAR(191) NOT NULL,
    `QtdeAtivo` DOUBLE NOT NULL,
    `CodCliente` INTEGER NOT NULL,
    `CodAtivo` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_CodCliente_fkey` FOREIGN KEY (`CodCliente`) REFERENCES `User`(`CodCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Holdings` ADD CONSTRAINT `Holdings_CodCliente_fkey` FOREIGN KEY (`CodCliente`) REFERENCES `User`(`CodCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Holdings` ADD CONSTRAINT `Holdings_CodAtivo_fkey` FOREIGN KEY (`CodAtivo`) REFERENCES `Stocks`(`CodAtivo`) ON DELETE RESTRICT ON UPDATE CASCADE;
