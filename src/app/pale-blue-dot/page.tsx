import type { Metadata } from 'next';
import { PaleBlueDot } from './client/PaleBlueDot';

export const metadata: Metadata = {
  title: 'Pale',
};

export default function PaleBlueDotPage() {
  return <PaleBlueDot />;
}
