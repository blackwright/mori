import { useCallback, useEffect } from 'react';
import { Clock } from 'three';

export function usePauseOnHide(clock: Clock) {
  const onVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      clock.stop();
    } else {
      clock.start();
    }
  }, [clock]);

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [clock]);
}
