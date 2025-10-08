import { type MutableRefObject, type Ref } from 'react';

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
