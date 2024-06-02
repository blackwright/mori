import type { Metadata } from 'next';
import { DuneIpsum } from './client/DuneIpsum';

export const metadata: Metadata = {
  title: 'Dune Ipsum',
};

export default function DuneIpsumPage() {
  return <DuneIpsum />;
}
