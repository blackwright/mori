'use client';

import { ErrorMessage, FullScreenMain } from '@/components';
import { useEffect } from 'react';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <FullScreenMain>
      <ErrorMessage className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {error.message}
      </ErrorMessage>
    </FullScreenMain>
  );
}
