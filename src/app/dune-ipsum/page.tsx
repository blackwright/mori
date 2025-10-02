import type { Metadata } from 'next';
import { write } from './actions';
import { DuneIpsum } from './client/DuneIpsum';

export const metadata: Metadata = {
  title: 'Dune Ipsum',
};

export default async function DuneIpsumPage() {
  const initialText = await write();

  return <DuneIpsum initialText={initialText} />;
}
