import { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';


// Rate limit simples em memória — máx 5 tentativas por IP em 15 min
const tentativas = new Map<string, { count: number; resetAt: number }>();

function checarRateLimit(ip: string): boolean {
  const agora = Date.now();
  const janela = 15 * 60 * 1000; // 15 minutos
  const max = 5;

  const entry = tentativas.get(ip);
  if (!entry || agora > entry.resetAt) {
    tentativas.set(ip, { count: 1, resetAt: agora + janela });
    return true; // permitido
  }
  if (entry.count >= max) return false; // bloqueado
  entry.count++;
  return true;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const ip =
          (req?.headers as Record<string, string | undefined>)?.['x-forwarded-for']?.split(',')[0]?.trim() ??
          'unknown';

        if (!checarRateLimit(ip)) {
          throw new Error('Muitas tentativas. Aguarde 15 minutos.');
        }
        const admin = await prisma.adminUser.findUnique({ where: { email: credentials.email } });
        if (!admin) return null;
        const ok = await bcrypt.compare(credentials.password, admin.hash);
        if (!ok) return null;
        return { id: admin.id, email: admin.email, name: 'Admin' };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  secret: process.env.NEXTAUTH_SECRET,
};