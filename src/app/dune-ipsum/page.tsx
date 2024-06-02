import { DuneIpsum } from './client/DuneIpsum';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dune Ipsum',
};

export default function DuneIpsumPage() {
  return <DuneIpsum />;
}
