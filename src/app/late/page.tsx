import type { Metadata } from 'next';
import { Late } from './client/Late';

export const metadata: Metadata = {
  title: '🌃',
};

export default function LatePage() {
  return <Late />;
}
