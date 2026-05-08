import LeadDetalheCliente from './LeadDetalheCliente';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Ficha do lead — Porta de Volta Admin',
  robots: { index: false, follow: false },
};
export default function LeadDetalhePage() {
  return <LeadDetalheCliente />;
}
