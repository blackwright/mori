import type { Metadata } from 'next';
import { Mori } from './client/Mori';

export const metadata: Metadata = {
  title: 'Mori',
};

export default function MoriPage() {
  return <Mori />;
}
