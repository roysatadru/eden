import { useEffect, useState, useRef, useCallback } from 'react';
import isEqual from 'lodash.isequal';

import { useMemoReferenceValues } from './use-memo-reference-values';

export enum Messages {
  Loading = 1,
  SomethingWentWrong = 2,
}

type CachedValidationsMessages<T> = {
  reqKey: T;
  validationMessage: string;
}[];

type UseValidateInputParams<T> = (
  | {
      checkAsync: (params: T) => Promise<string | null>;
      catchError: (err: Error) => Promise<string | null> | (string | null);
    }
  | {
      checkAsync?: undefined;
      catchError?: undefined;
    }
) & {
  checkSync?: (params: T) => string | null;
  inputValue?: T;
  debounceTimeInMs?: number;
};

export function useValidateInput<T>(params: UseValidateInputParams<T>) {
  const {
    checkAsync,
    catchError,
    checkSync,
    inputValue,
    debounceTimeInMs = 500,
  } = params;

  const checkAsyncMemo = useMemoReferenceValues(checkAsync);
  const checkSyncMemo = useMemoReferenceValues(checkSync);
  const catchErrorMemo = useMemoReferenceValues(catchError);
  const inputValueMemo = useMemoReferenceValues(inputValue);

  const debounceTime = useRef(debounceTimeInMs).current;

  const cachedValidationRef = useRef<CachedValidationsMessages<T>>([]);
  const catchErrorMessagesRef = useRef<string[]>([]);

  const [inputLoaded, setInputLoaded] = useState<T[]>([]);

  const getCatchErrorMessage = useCallback(async function (
    reqKey: T,
    errorMessage?: string | Promise<string | null> | null,
  ) {
    function pushErrorMessages(errorMessage: string) {
      catchErrorMessagesRef.current.push(errorMessage);
      cachedValidationRef.current.push({
        reqKey,
        validationMessage: errorMessage,
      });
    }

    if (!errorMessage) {
      return null;
    }

    if (typeof errorMessage === 'string') {
      pushErrorMessages(errorMessage);
      return errorMessage;
    }

    if (errorMessage instanceof Promise) {
      const errorMessagePromise = await errorMessage;

      if (errorMessagePromise) {
        pushErrorMessages(errorMessagePromise);
        return errorMessagePromise;
      }
    }

    return null;
  },
  []);

  useEffect(
    function () {
      if (!inputValueMemo) {
        return;
      }

      // if it already produced error in the past
      if (
        cachedValidationRef.current.find(
          ({ reqKey, validationMessage }) =>
            isEqual(reqKey, inputValueMemo) &&
            !catchErrorMessagesRef.current.includes(validationMessage),
        )
      ) {
        return;
      }

      cachedValidationRef.current = cachedValidationRef.current.filter(
        ({ reqKey }) => !isEqual(reqKey, inputValueMemo),
      );

      // sync validations taking place
      const validationSyncMessage = checkSyncMemo?.(inputValueMemo);

      if (validationSyncMessage) {
        setInputLoaded(cur => [...cur, inputValueMemo]);
        cachedValidationRef.current.push({
          reqKey: inputValueMemo,
          validationMessage: validationSyncMessage,
        });

        return;
      }

      // async validations taking place with debounce
      if (checkAsyncMemo) {
        setInputLoaded(cur =>
          cur.filter(item => !isEqual(item, inputValueMemo)),
        );

        const timeout = setTimeout(function () {
          checkAsyncMemo(inputValueMemo)
            .then(function (data) {
              if (data) {
                cachedValidationRef.current.push({
                  reqKey: inputValueMemo,
                  validationMessage: data,
                });
              }
            })
            .catch(async function (err) {
              return getCatchErrorMessage(
                inputValueMemo,
                catchErrorMemo?.(err),
              );
            })
            .finally(function () {
              setInputLoaded(cur => [...cur, inputValueMemo]);
            });
        }, debounceTime);

        return () => {
          clearTimeout(timeout);
        };
      }
    },
    [
      catchErrorMemo,
      checkAsyncMemo,
      checkSyncMemo,
      debounceTime,
      getCatchErrorMessage,
      inputValueMemo,
    ],
  );

  const isLoading = useCallback(
    function (value?: T) {
      if (!value) {
        return false;
      }

      return !inputLoaded.find(function (input) {
        return isEqual(input, value);
      });
    },
    [inputLoaded],
  );

  const getErrorMessage = useCallback(function (value?: T) {
    return (
      cachedValidationRef.current.find(function ({ reqKey }) {
        return isEqual(reqKey, value);
      })?.validationMessage ?? null
    );
  }, []);

  return {
    isValidating: isLoading(inputValueMemo),

    errorMessage: getErrorMessage(inputValueMemo) ?? null,

    // a function to validate the input without debounce
    isInputValid: useCallback(
      async function <K>(params: T extends unknown ? K : T) {
        const updatedParams = params as T;

        const validationFromCache =
          getErrorMessage(updatedParams) ||
          (updatedParams
            ? !!inputValueMemo && isLoading(updatedParams)
            : false);

        if (
          validationFromCache &&
          !catchErrorMessagesRef.current.includes(validationFromCache as string)
        ) {
          return typeof validationFromCache === 'string'
            ? validationFromCache
            : Messages.Loading;
        }

        cachedValidationRef.current = cachedValidationRef.current.filter(
          ({ reqKey }) => !isEqual(reqKey, updatedParams),
        );

        const validationSyncMessage = checkSyncMemo?.(updatedParams);

        if (validationSyncMessage) {
          cachedValidationRef.current.push({
            reqKey: updatedParams,
            validationMessage: validationSyncMessage,
          });

          return validationSyncMessage;
        }

        if (!checkAsyncMemo) {
          return null;
        }

        try {
          const validationAsyncMessage = await checkAsyncMemo(updatedParams);

          if (validationAsyncMessage) {
            cachedValidationRef.current.push({
              reqKey: updatedParams,
              validationMessage: validationAsyncMessage,
            });

            return validationAsyncMessage;
          }

          return null;
        } catch (err) {
          if (!(err instanceof Error)) {
            return Messages.SomethingWentWrong;
          }

          return getCatchErrorMessage(updatedParams, catchErrorMemo?.(err));
        }
      },
      [
        getErrorMessage,
        isLoading,
        inputValueMemo,
        checkSyncMemo,
        checkAsyncMemo,
        getCatchErrorMessage,
        catchErrorMemo,
      ],
    ),
  };
}
