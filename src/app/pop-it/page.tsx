import type { Metadata } from 'next';
import { PopIt } from './client/PopIt';

export const metadata: Metadata = {
  title: 'Pop It',
};

export default function PopItPage() {
  return <PopIt />;
}
