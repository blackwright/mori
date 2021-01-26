import * as React from 'react';
import { debounced } from 'utils';

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

export function useDebouncedResize(
  fn: React.EffectCallback,
  deps?: React.DependencyList
) {
  React.useEffect(() => {
    fn();
    const debouncedFn = debounced(fn);

    window.addEventListener('resize', debouncedFn);
    return () => window.removeEventListener('resize', debouncedFn);
  }, deps);
}
