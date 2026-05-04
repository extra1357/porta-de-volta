-- CreateEnum
CREATE TYPE "TipoPerfil" AS ENUM ('PACIENTE', 'FAMILIAR');

-- CreateEnum
CREATE TYPE "StatusLead" AS ENUM ('NOVO', 'EM_ATENDIMENTO', 'ENCAMINHADO', 'FINALIZADO', 'ARQUIVADO');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "perfil" "TipoPerfil" NOT NULL,
    "primeiroNome" TEXT NOT NULL,
    "contatoWhatsapp" TEXT NOT NULL,
    "contatoEmail" TEXT,
    "comoEstaHoje" TEXT NOT NULL,
    "tempoSituacao" TEXT NOT NULL,
    "jaTeveAjuda" BOOLEAN NOT NULL,
    "relatoLivre" TEXT NOT NULL,
    "status" "StatusLead" NOT NULL DEFAULT 'NOVO',
    "notaInterna" TEXT,
    "ip" TEXT,
    "userAgent" TEXT,
    "lgpdConsentimento" BOOLEAN NOT NULL DEFAULT false,
    "lgpdDataConsent" TIMESTAMP(3),

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leadId" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "detalhes" TEXT,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminSession" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiraEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_criadoEm_idx" ON "Lead"("criadoEm");

-- CreateIndex
CREATE INDEX "Lead_perfil_idx" ON "Lead"("perfil");

-- CreateIndex
CREATE INDEX "AuditLog_leadId_idx" ON "AuditLog"("leadId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminSession_token_key" ON "AdminSession"("token");

-- CreateIndex
CREATE INDEX "AdminSession_token_idx" ON "AdminSession"("token");

-- CreateIndex
CREATE INDEX "AdminSession_expiraEm_idx" ON "AdminSession"("expiraEm");

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
