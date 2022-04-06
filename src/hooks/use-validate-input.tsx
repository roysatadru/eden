import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import isEqual from 'lodash.isequal';

type ParamsType<T, K> = K extends undefined | null ? T : K;

type CompleteValidationsMessagesType<T, K> = {
  reqKey: ParamsType<T, K>;
  validationMessage: string;
}[];

export function useValidateInput<T, K>(
  checkAsync: (params: ParamsType<T, K>) => Promise<string | null>,
  checkSync?: ((params: ParamsType<T, K>) => string | null) | null,
  inputValue?: ParamsType<T, K>,
) {
  const [notLoadingInputValidations, setNotLoadingInputValidations] = useState(
    [] as ParamsType<T, K>[],
  );

  const completeValidationsMessagesRef = useRef<
    CompleteValidationsMessagesType<T, K>
  >([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkAsyncMemo = useMemo(() => checkAsync, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkSyncMemo = useMemo(() => checkSync, []);

  const previousInputValueRef = useRef(inputValue);
  const valueForValidation = useMemo(
    function () {
      if (isEqual(previousInputValueRef.current, inputValue)) {
        return previousInputValueRef.current;
      }
      return inputValue;
    },
    [inputValue],
  );

  useEffect(
    function () {
      if (!valueForValidation) {
        return;
      }

      if (
        completeValidationsMessagesRef.current.find(
          ({ reqKey, validationMessage }) =>
            isEqual(reqKey, valueForValidation) &&
            validationMessage !== "Couldn't validate!",
        )
      ) {
        return;
      }

      const validationSyncMessage = checkSyncMemo?.(valueForValidation);

      if (validationSyncMessage) {
        setNotLoadingInputValidations(cur => [...cur, valueForValidation]);
        completeValidationsMessagesRef.current.push({
          reqKey: valueForValidation,
          validationMessage: validationSyncMessage,
        });

        return;
      }

      const timeout = setTimeout(function () {
        checkAsyncMemo(valueForValidation).then(function (data) {
          if (data) {
            completeValidationsMessagesRef.current.push({
              reqKey: valueForValidation,
              validationMessage: data,
            });
          }

          setNotLoadingInputValidations(cur => [...cur, valueForValidation]);
        });
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    },
    [checkAsyncMemo, checkSyncMemo, valueForValidation],
  );

  const isLoading = useCallback(
    function (value?: ParamsType<T, K>) {
      if (!value) {
        return false;
      }

      return !notLoadingInputValidations.find(function (input) {
        return isEqual(input, value);
      });
    },
    [notLoadingInputValidations],
  );

  const getErrorMessage = useCallback(function (value?: ParamsType<T, K>) {
    return completeValidationsMessagesRef.current.find(function ({ reqKey }) {
      return isEqual(reqKey, value);
    })?.validationMessage;
  }, []);

  return {
    isValidating: isLoading(valueForValidation),

    errorMessage: getErrorMessage(valueForValidation) ?? null,

    isInputValid: useCallback(
      async function (params: K) {
        const updatedParams = params as ParamsType<T, K>;

        const validationFromCache =
          getErrorMessage(updatedParams) ||
          (valueForValidation ? isLoading(updatedParams) : false);

        if (validationFromCache) {
          return typeof validationFromCache === 'string'
            ? validationFromCache
            : 'Loading...';
        }

        const validationSyncMessage = checkSyncMemo?.(updatedParams);

        if (validationSyncMessage) {
          completeValidationsMessagesRef.current.push({
            reqKey: updatedParams,
            validationMessage: validationSyncMessage,
          });

          return validationSyncMessage;
        }

        if (!checkAsyncMemo) {
          return null;
        }

        const validationAsyncMessage = await checkAsyncMemo(updatedParams);

        if (validationAsyncMessage) {
          completeValidationsMessagesRef.current.push({
            reqKey: updatedParams,
            validationMessage: validationAsyncMessage,
          });

          return validationAsyncMessage;
        }

        return null;
      },
      [
        checkAsyncMemo,
        checkSyncMemo,
        getErrorMessage,
        isLoading,
        valueForValidation,
      ],
    ),
  };
}
