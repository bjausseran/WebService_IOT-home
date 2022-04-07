-- CreateEnum
CREATE TYPE "SensorType" AS ENUM ('TEMPERATURE', 'HUMIDITY', 'BARO', 'PROXIMITY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Captor" (
    "id" TEXT NOT NULL,
    "type" "SensorType" NOT NULL,
    "designation" TEXT NOT NULL,
    "rawValue_int" INTEGER NOT NULL DEFAULT 0,
    "rawValue_bool" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Captor_pkey" PRIMARY KEY ("id")
);
