interface AsyncFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any): Promise<any>;
}

export function debounce(
  func: AsyncFunction,
  wait: number,
  onWait?: (() => void) | null,
  onFinish?: (() => void) | null,
) {
  let resolvePromise = null as (() => void) | null;

  function promisifiedSetTimeout(ms: number) {
    return new Promise<void>(function (resolve, reject) {
      const timeout = setTimeout(() => resolve(onFinish?.()), ms);
      resolvePromise = function () {
        clearTimeout(timeout);
        reject();
      };
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async function (this: any, ...args: any) {
    onWait?.();

    if (resolvePromise) {
      resolvePromise();
      resolvePromise = null;
    }

    try {
      await promisifiedSetTimeout(wait);

      return func.apply(this, args);
    } catch (error) {
      return async () => {
        return;
      };
    }
  };
}
