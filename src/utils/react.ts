import {
  useEffect,
  type DependencyList,
  type EffectCallback,
  type MutableRefObject,
  type Ref,
} from 'react';
import { debounced } from '@/utils';

export function mergeRefs<T>(
  refs: Array<Ref<T> | null | undefined>,
): (element: T | null) => void {
  return (element: T | null) => {
    refs
      .filter((ref) => ref != null)
      .forEach((ref) => {
        if (typeof ref === 'function') {
          ref(element);
        } else {
          (ref as MutableRefObject<T | null>).current = element;
        }
      });
  };
}

export function useDebouncedResize(fn: EffectCallback, deps?: DependencyList) {
  useEffect(() => {
    const cleanupFn = fn();
    const debouncedFn = debounced(fn);

    window.addEventListener('resize', debouncedFn);

    return () => {
      window.removeEventListener('resize', debouncedFn);
      cleanupFn?.();
    };
  }, deps);
}
