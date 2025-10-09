'use client';

import { FullScreenMain } from '@/components/FullScreenMain';
import { LoadingIndicator } from '@/components/LoadingIndicator';

export default function Loading() {
  return (
    <FullScreenMain className="flex items-center justify-center">
      <LoadingIndicator />
    </FullScreenMain>
  );
}
