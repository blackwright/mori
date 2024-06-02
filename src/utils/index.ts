export function debounced(
  fn: (...args: any[]) => any,
  msToWait: number = 500,
  isImmediate: boolean = false,
) {
  let timeoutId: number | null = null;

  return function (this: any, ...args: any[]): any {
    const context = this;

    const delayedFunction = function () {
      timeoutId = null;

      if (!isImmediate) {
        fn.apply(context, args);
      }
    };

    const shouldCallNow = isImmediate && timeoutId == null;

    if (timeoutId != null) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(delayedFunction, msToWait);

    if (shouldCallNow) {
      fn.apply(context, args);
    }
  };
}
