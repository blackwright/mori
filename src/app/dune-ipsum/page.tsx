import type { Metadata } from 'next';
import { write } from './actions';
import { DuneIpsum } from './client/DuneIpsum';

export const metadata: Metadata = {
  title: 'Dune Ipsum',
};

export default async function DuneIpsumPage() {
  let initialText = '';
  let initialError = '';

  try {
    initialText = await write();
  } catch (error) {
    if (error instanceof Error) {
      initialError = error.message;
    }
  }

  return <DuneIpsum initialText={initialText} initialError={initialError} />;
}
