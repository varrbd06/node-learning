-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "action" VARCHAR(50) NOT NULL,
    "status" VARCHAR(10) NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);
