-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stocks` (
    `id` VARCHAR(191) NOT NULL,
    `CodAtivo` VARCHAR(191) NOT NULL,
    `NomeAtivo` VARCHAR(191) NOT NULL,
    `Valor` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallet` (
    `id` VARCHAR(191) NOT NULL,
    `CodCliente` VARCHAR(191) NOT NULL,
    `Saldo` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Holdings` (
    `id` VARCHAR(191) NOT NULL,
    `Quantidade` DOUBLE NOT NULL,
    `CodCliente` VARCHAR(191) NOT NULL,
    `CodAtivo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_CodCliente_fkey` FOREIGN KEY (`CodCliente`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Holdings` ADD CONSTRAINT `Holdings_CodCliente_fkey` FOREIGN KEY (`CodCliente`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Holdings` ADD CONSTRAINT `Holdings_CodAtivo_fkey` FOREIGN KEY (`CodAtivo`) REFERENCES `Stocks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
