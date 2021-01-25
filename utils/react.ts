import * as React from 'react';

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
