import type { Metadata } from 'next';
import { Rise } from './client/Rise';

export const metadata: Metadata = {
  title: 'Rise',
};

export default function RisePage() {
  return <Rise />;
}
