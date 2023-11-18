-- CreateTable
CREATE TABLE `tbl_addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(255) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `province` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `postal_code` VARCHAR(10) NOT NULL,
    `contact_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_addresses` ADD CONSTRAINT `tbl_addresses_contact_id_fkey` FOREIGN KEY (`contact_id`) REFERENCES `tbl_contacts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
