/*
  Warnings:

  - You are about to drop the column `oauth_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `oauth_token_secret` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdBy` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedBy` on the `Category` table. All the data in the column will be lost.
  - You are about to alter the column `totalCost` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - The primary key for the `OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to alter the column `quantity` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `cost` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to drop the column `alt_sku` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedBy` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_number` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_cost` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `cost` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `markup` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `totalCost` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to drop the `PendingStoreUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductsFromSupplier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoreUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `storeId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_orderedByUserId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_toStoreId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_productId_supplierId_fkey`;

-- DropForeignKey
ALTER TABLE `Org` DROP FOREIGN KEY `Org_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `PendingStoreUser` DROP FOREIGN KEY `PendingStoreUser_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductsFromSupplier` DROP FOREIGN KEY `ProductsFromSupplier_productId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductsFromSupplier` DROP FOREIGN KEY `ProductsFromSupplier_supplierId_fkey`;

-- DropForeignKey
ALTER TABLE `Store` DROP FOREIGN KEY `Store_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `StoreUser` DROP FOREIGN KEY `StoreUser_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `StoreUser` DROP FOREIGN KEY `StoreUser_userId_fkey`;

-- AlterTable
ALTER TABLE `Account` DROP COLUMN `oauth_token`,
    DROP COLUMN `oauth_token_secret`;

-- AlterTable
ALTER TABLE `Category` DROP PRIMARY KEY,
    DROP COLUMN `createdBy`,
    DROP COLUMN `id`,
    DROP COLUMN `modifiedBy`,
    ADD COLUMN `storeId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`storeId`, `name`);

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `createdDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `estimatedBudget` DOUBLE NULL,
    ADD COLUMN `expectedDeliveryDate` DATETIME(3) NULL,
    ADD COLUMN `inventoryId` VARCHAR(191) NULL,
    ADD COLUMN `reasonForLastUpdate` VARCHAR(191) NULL,
    MODIFY `totalCost` DOUBLE NULL;

-- AlterTable
ALTER TABLE `OrderItem` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `supplierId`,
    MODIFY `quantity` DOUBLE NULL,
    MODIFY `cost` DOUBLE NULL,
    ADD PRIMARY KEY (`orderId`, `productId`);

-- AlterTable
ALTER TABLE `Org` MODIFY `ownerId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `alt_sku`,
    DROP COLUMN `categoryId`,
    DROP COLUMN `createdBy`,
    DROP COLUMN `modifiedBy`,
    DROP COLUMN `product_number`,
    DROP COLUMN `shipping_cost`,
    DROP COLUMN `size`,
    ADD COLUMN `altId` VARCHAR(191) NULL,
    ADD COLUMN `altSku` VARCHAR(191) NULL,
    ADD COLUMN `categoryName` VARCHAR(191) NULL,
    ADD COLUMN `originalCost` DOUBLE NULL,
    ADD COLUMN `shippingCost` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `storeId` VARCHAR(191) NOT NULL,
    ADD COLUMN `supplierId` VARCHAR(191) NULL,
    ADD COLUMN `typicalExpiryInDays` DOUBLE NULL,
    ADD COLUMN `unitOfMeasure` VARCHAR(191) NULL,
    ADD COLUMN `visibleUntil` DATETIME(3) NULL,
    MODIFY `cost` DOUBLE NULL,
    MODIFY `markup` DOUBLE NULL DEFAULT 0,
    MODIFY `totalCost` DOUBLE NULL;

-- AlterTable
ALTER TABLE `Store` ADD COLUMN `connectedToStoreId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Supplier` ADD COLUMN `orgId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `orgId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `PendingStoreUser`;

-- DropTable
DROP TABLE `ProductsFromSupplier`;

-- DropTable
DROP TABLE `StoreUser`;

-- CreateTable
CREATE TABLE `StoreMembership` (
    `storeId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `role` ENUM('Owner', 'Admin', 'Member') NOT NULL DEFAULT 'Member',
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastUpdated` DATETIME(3) NOT NULL,

    PRIMARY KEY (`storeId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PendingStoreMembership` (
    `storeId` VARCHAR(191) NOT NULL,
    `role` ENUM('Owner', 'Admin', 'Member') NOT NULL DEFAULT 'Member',
    `emailId` VARCHAR(191) NOT NULL,
    `phoneNum` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastUpdated` DATETIME(3) NOT NULL,

    PRIMARY KEY (`storeId`, `emailId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductGroupCategory` (
    `storeId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastUpdated` DATETIME(3) NULL,

    PRIMARY KEY (`storeId`, `name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductGroup` (
    `id` VARCHAR(191) NOT NULL,
    `storeId` VARCHAR(191) NOT NULL,
    `categoryName` VARCHAR(191) NULL,
    `totalCost` DOUBLE NULL,
    `retailPrice` DOUBLE NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `visibleUntil` DATETIME(3) NULL,
    `unitOfMeasure` VARCHAR(191) NULL,
    `typicalExpiryInDays` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductGroupItem` (
    `productGroupId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NULL,
    `cost` DOUBLE NULL,
    `size` VARCHAR(191) NULL,

    PRIMARY KEY (`productGroupId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventory` (
    `id` VARCHAR(191) NOT NULL,
    `lastUpdatedDate` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryItems` (
    `inventoryId` VARCHAR(191) NOT NULL,
    `storeId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `receivedDate` DATETIME(3) NOT NULL,
    `originalCost` DOUBLE NULL,
    `shippingCost` DOUBLE NULL,
    `totalCost` DOUBLE NULL,
    `markup` DOUBLE NULL,
    `expiryDate` DATETIME(3) NULL,
    `lastUpdatedDate` DATETIME(3) NULL,
    `onHandQty` DOUBLE NULL,

    PRIMARY KEY (`inventoryId`, `storeId`, `productId`, `receivedDate`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_orgId_fkey` FOREIGN KEY (`orgId`) REFERENCES `Org`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Org` ADD CONSTRAINT `Org_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_connectedToStoreId_fkey` FOREIGN KEY (`connectedToStoreId`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreMembership` ADD CONSTRAINT `StoreMembership_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreMembership` ADD CONSTRAINT `StoreMembership_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PendingStoreMembership` ADD CONSTRAINT `PendingStoreMembership_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_toStoreId_fkey` FOREIGN KEY (`toStoreId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_orderedByUserId_fkey` FOREIGN KEY (`orderedByUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `Inventory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_storeId_categoryName_fkey` FOREIGN KEY (`storeId`, `categoryName`) REFERENCES `Category`(`storeId`, `name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductGroupCategory` ADD CONSTRAINT `ProductGroupCategory_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductGroup` ADD CONSTRAINT `ProductGroup_storeId_categoryName_fkey` FOREIGN KEY (`storeId`, `categoryName`) REFERENCES `ProductGroupCategory`(`storeId`, `name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductGroupItem` ADD CONSTRAINT `ProductGroupItem_productGroupId_fkey` FOREIGN KEY (`productGroupId`) REFERENCES `ProductGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductGroupItem` ADD CONSTRAINT `ProductGroupItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_orgId_fkey` FOREIGN KEY (`orgId`) REFERENCES `Org`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryItems` ADD CONSTRAINT `InventoryItems_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `Inventory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryItems` ADD CONSTRAINT `InventoryItems_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryItems` ADD CONSTRAINT `InventoryItems_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
