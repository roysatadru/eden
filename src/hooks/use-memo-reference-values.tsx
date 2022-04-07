import { useMemo, useRef } from 'react';
import isEqual from 'lodash.isequal';

interface UseMemoReferenceValuesOptions {
  disableMemoChange?: boolean;
}

export function useMemoReferenceValues<T>(
  value: T,
  options?: UseMemoReferenceValuesOptions,
) {
  const { disableMemoChange = false } = options ?? {};

  const previousValueRef = useRef(value);

  return useMemo(
    function () {
      if (
        typeof value !== 'function' &&
        !disableMemoChange &&
        !isEqual(previousValueRef.current, value)
      ) {
        previousValueRef.current = value;
      }

      return previousValueRef.current;
    },
    [disableMemoChange, value],
  );
}
