import * as React from 'react';
import { Clock } from 'three';

export function mergeRefs<T>(
  refs: Array<React.Ref<T> | null | undefined>
): (element: T | null) => void {
  return (element: T | null) => {
    refs
      .filter((ref) => ref != null)
      .forEach((ref) => {
        if (typeof ref === 'function') {
          ref(element);
        } else {
          (ref as React.MutableRefObject<T>).current = element;
        }
      });
  };
}

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
