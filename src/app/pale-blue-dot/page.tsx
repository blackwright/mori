import { PaleBlueDot } from './client/PaleBlueDot';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pale',
};

export default function PaleBlueDotPage() {
  return <PaleBlueDot />;
}
