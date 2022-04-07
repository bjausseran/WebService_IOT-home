-- CreateEnum
CREATE TYPE "ActuatorType" AS ENUM ('BLINDS', 'LIGHT');

-- CreateTable
CREATE TABLE "Actuator" (
    "id" TEXT NOT NULL,
    "type" "ActuatorType" NOT NULL,
    "designation" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,

    CONSTRAINT "Actuator_pkey" PRIMARY KEY ("id")
);
