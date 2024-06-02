import { Pale } from './client/Pale';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pale',
};

export default function PalePage() {
  return <Pale />;
}
