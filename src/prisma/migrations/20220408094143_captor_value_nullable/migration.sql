-- AlterTable
ALTER TABLE "Captor" ALTER COLUMN "rawValue_int" DROP NOT NULL,
ALTER COLUMN "rawValue_int" DROP DEFAULT,
ALTER COLUMN "rawValue_bool" DROP NOT NULL,
ALTER COLUMN "rawValue_bool" DROP DEFAULT;
