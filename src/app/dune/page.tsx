import { Dune } from './client/Dune';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dune',
};

export default function DunePage() {
  return <Dune />;
}
