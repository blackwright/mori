import * as React from 'react';
import { Clock } from 'three';

export function usePauseOnHide(clock: Clock) {
  const onVisibilityChange = React.useCallback(() => {
    if (document.visibilityState === 'hidden') {
      clock.stop();
    } else {
      clock.start();
    }
  }, [clock]);

  React.useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [clock]);
}
