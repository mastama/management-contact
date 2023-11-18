-- CreateTable
CREATE TABLE `tbl_contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_contacts` ADD CONSTRAINT `tbl_contacts_username_fkey` FOREIGN KEY (`username`) REFERENCES `tbl_users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
