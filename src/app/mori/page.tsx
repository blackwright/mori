import { Mori } from './client/Mori';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mori',
};

export default function MoriPage() {
  return <Mori />;
}
