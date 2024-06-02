import { LoadingGrid } from './client/LoadingGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loading Grid',
};

export default function LoadingGridPage() {
  return <LoadingGrid />;
}
