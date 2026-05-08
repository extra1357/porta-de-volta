import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntar(pergunta) {
  return new Promise((resolve) => rl.question(pergunta, resolve));
}

async function main() {
  console.log('\n=== Criar novo administrador — Porta de Volta ===\n');

  const email = await perguntar('E-mail: ');
  if (!email.includes('@')) { console.error('E-mail inválido.'); process.exit(1); }

  const existente = await prisma.adminUser.findUnique({ where: { email } });
  if (existente) { console.error('Já existe um admin com este e-mail.'); process.exit(1); }

  const senha = await perguntar('Senha (mín. 12 caracteres): ');
  if (senha.length < 12) { console.error('Senha muito curta.'); process.exit(1); }

  const confirmacao = await perguntar('Confirme a senha: ');
  if (senha !== confirmacao) { console.error('Senhas não coincidem.'); process.exit(1); }

  const hash = await bcrypt.hash(senha, 12);
  const admin = await prisma.adminUser.create({ data: { email, hash } });

  console.log(`\n✅ Admin criado com sucesso!`);
  console.log(`   ID: ${admin.id}`);
  console.log(`   E-mail: ${admin.email}\n`);

  rl.close();
  await prisma.$disconnect();
}

main().catch((e) => { console.error('Erro:', e.message); process.exit(1); });
