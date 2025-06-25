/*
  Warnings:

  - You are about to drop the `logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SUCCESS', 'ERROR');

-- DropTable
DROP TABLE "logs";

-- CreateTable
CREATE TABLE "client_sessions" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qrc_gen_logs" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "text" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "foregroundColor" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "cellShape" TEXT NOT NULL,
    "gradientColor" TEXT NOT NULL,
    "gradientDirection" TEXT NOT NULL,
    "margin" INTEGER NOT NULL,
    "errorCorrection" TEXT NOT NULL,
    "sessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "qrc_gen_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_sessions_sessionId_key" ON "client_sessions"("sessionId");

-- CreateIndex
CREATE INDEX "qrc_gen_logs_status_idx" ON "qrc_gen_logs"("status");

-- CreateIndex
CREATE INDEX "qrc_gen_logs_createdAt_idx" ON "qrc_gen_logs"("createdAt");

-- CreateIndex
CREATE INDEX "qrc_gen_logs_text_idx" ON "qrc_gen_logs"("text");

-- CreateIndex
CREATE INDEX "qrc_gen_logs_size_idx" ON "qrc_gen_logs"("size");

-- CreateIndex
CREATE INDEX "qrc_gen_logs_foregroundColor_idx" ON "qrc_gen_logs"("foregroundColor");

-- CreateIndex
CREATE INDEX "qrc_gen_logs_backgroundColor_idx" ON "qrc_gen_logs"("backgroundColor");

-- CreateIndex
CREATE INDEX "qrc_gen_logs_cellShape_idx" ON "qrc_gen_logs"("cellShape");

-- CreateIndex
CREATE INDEX "qrc_gen_logs_gradientColor_idx" ON "qrc_gen_logs"("gradientColor");

-- CreateIndex
CREATE INDEX "qrc_gen_logs_gradientDirection_idx" ON "qrc_gen_logs"("gradientDirection");

-- CreateIndex
CREATE INDEX "qrc_gen_logs_margin_idx" ON "qrc_gen_logs"("margin");

-- CreateIndex
CREATE INDEX "qrc_gen_logs_errorCorrection_idx" ON "qrc_gen_logs"("errorCorrection");
