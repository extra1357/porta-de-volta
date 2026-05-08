import { z } from 'zod';

export const LeadSchema = z.object({
  perfil: z.enum(['PACIENTE', 'FAMILIAR']),
  primeiroNome: z.string().min(2, 'Mínimo 2 caracteres').max(100).trim(),
  contatoWhatsapp: z.string().regex(/^\d{10,11}$/, 'Somente números, 10 ou 11 dígitos').trim(),
  contatoEmail: z.string().trim().transform((v) => (v === '' ? undefined : v)).pipe(z.string().email('E-mail inválido').max(200).optional()),
  comoEstaHoje: z.string().min(10, 'Mínimo 10 caracteres').max(2000).trim(),
  tempoSituacao: z.string().min(1, 'Campo obrigatório').max(100),
  jaTeveAjuda: z.boolean(),
  relatoLivre: z.string().min(10, 'Mínimo 10 caracteres').max(5000).trim(),
  lgpdConsentimento: z.boolean().refine((v) => v === true, { message: 'Aceite os termos para continuar' }),
});

export type LeadInput = z.infer<typeof LeadSchema>;

export const LeadUpdateSchema = z.object({
  status: z.enum(['NOVO', 'EM_ATENDIMENTO', 'ENCAMINHADO', 'FINALIZADO', 'ARQUIVADO']).optional(),
  notaInterna: z.string().max(5000).trim().optional(),
});

export type LeadUpdate = z.infer<typeof LeadUpdateSchema>;
