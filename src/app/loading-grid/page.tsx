import type { Metadata } from 'next';
import { LoadingGrid } from './client/LoadingGrid';

export const metadata: Metadata = {
  title: 'Loading Grid',
};

export default function LoadingGridPage() {
  return <LoadingGrid />;
}
