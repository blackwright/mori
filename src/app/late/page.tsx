import { Late } from './client/Late';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '🌃',
};

export default function LatePage() {
  return <Late />;
}
