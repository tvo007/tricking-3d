-- AlterTable
ALTER TABLE `sessiondata` MODIFY `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `sessionsources` MODIFY `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `sessionsummaries` MODIFY `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);
