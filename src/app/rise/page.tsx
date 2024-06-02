import { Rise } from './client/Rise';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rise',
};

export default function RisePage() {
  return <Rise />;
}
