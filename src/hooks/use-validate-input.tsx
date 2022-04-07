import { useEffect, useState, useRef, useCallback } from 'react';
import isEqual from 'lodash.isequal';

import { useMemoReferenceValues } from './use-memo-reference-values';

type ParamsType<T, K> = K extends unknown ? T : K;

type CachedValidationsMessages<T, K, A, S, C> = {
  reqKey: ParamsType<T, K>;
  validationMessage:
    | ParamsType<null, A>
    | ParamsType<null, S>
    | ParamsType<null, C>;
}[];

type UseValidateInputParams<T, K, A, S, C> = (
  | {
      checkAsync: (params: ParamsType<T, K>) => Promise<A | null>;
      catchError: (err: Error) => Promise<C | null> | (C | null);
    }
  | {
      checkAsync?: undefined;
      catchError?: undefined;
    }
) & {
  checkSync?: (params: ParamsType<T, K>) => S | null;
  inputValue?: ParamsType<T, K>;
  debounceTimeInMs?: number;
};

export function useValidateInput<
  UseValidateInputValue,
  IsInputValidParams,
  AsyncMessages extends string,
  SyncMessages extends string,
  CatchErrorMessage extends string,
>(
  params: UseValidateInputParams<
    UseValidateInputValue,
    IsInputValidParams,
    AsyncMessages,
    SyncMessages,
    CatchErrorMessage
  >,
) {
  type InputLoadedStateType = ParamsType<
    UseValidateInputValue,
    IsInputValidParams
  >[];

  type CachedValidationRefType = CachedValidationsMessages<
    UseValidateInputValue,
    IsInputValidParams,
    AsyncMessages,
    SyncMessages,
    CatchErrorMessage
  >;

  type ErrorMessages =
    | ParamsType<null, AsyncMessages>
    | ParamsType<null, SyncMessages>
    | ParamsType<null, CatchErrorMessage>;

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

  const cachedValidationRef = useRef<CachedValidationRefType>([]);
  const catchErrorMessagesRef = useRef<CatchErrorMessage[]>([]);

  const [inputLoaded, setInputLoaded] = useState<InputLoadedStateType>([]);

  const getCatchErrorMessage = useCallback(function (
    reqKey: ParamsType<UseValidateInputValue, IsInputValidParams>,
    errorMessage: ErrorMessages,
  ) {
    if (!errorMessage) {
      return;
    } else if (typeof errorMessage === 'string') {
      cachedValidationRef.current.push({
        reqKey,
        validationMessage: errorMessage,
      });
      return;
    } else {
      return 'proceed';
    }
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
            !catchErrorMessagesRef.current.includes(
              validationMessage as CatchErrorMessage,
            ),
        )
      ) {
        return;
      }

      // sync validations taking place
      const validationSyncMessage = checkSyncMemo?.(inputValueMemo);

      if (validationSyncMessage) {
        setInputLoaded(cur => [...cur, inputValueMemo]);
        cachedValidationRef.current.push({
          reqKey: inputValueMemo,
          validationMessage: validationSyncMessage as ErrorMessages,
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
                  validationMessage: data as ErrorMessages,
                });
              }
            })
            .catch(async function (err) {
              const errorMessage = catchErrorMemo?.(err);

              const isProceed = getCatchErrorMessage(
                inputValueMemo,
                errorMessage as ErrorMessages,
              );

              if (!isProceed) {
                return;
              }

              getCatchErrorMessage(
                inputValueMemo,
                (await errorMessage) as ErrorMessages,
              );

              return;
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
    function (value?: ParamsType<UseValidateInputValue, IsInputValidParams>) {
      if (!value) {
        return false;
      }

      return !inputLoaded.find(function (input) {
        return isEqual(input, value);
      });
    },
    [inputLoaded],
  );

  const getErrorMessage = useCallback(function (
    value?: ParamsType<UseValidateInputValue, IsInputValidParams>,
  ) {
    return cachedValidationRef.current.find(function ({ reqKey }) {
      return isEqual(reqKey, value);
    })?.validationMessage;
  },
  []);

  return {
    isValidating: isLoading(inputValueMemo),

    errorMessage: getErrorMessage(inputValueMemo) ?? null,

    // a function to validate the input without debounce
    isInputValid: useCallback(
      async function (params: IsInputValidParams) {
        const updatedParams = params as ParamsType<
          UseValidateInputValue,
          IsInputValidParams
        >;

        const validationFromCache =
          getErrorMessage(updatedParams) ||
          (inputValueMemo ? isLoading(updatedParams) : false);

        if (
          !!validationFromCache &&
          !catchErrorMessagesRef.current.includes(validationFromCache as never)
        ) {
          return typeof validationFromCache === 'string'
            ? validationFromCache
            : 'Loading...';
        }

        const validationSyncMessage = checkSyncMemo?.(updatedParams);

        if (validationSyncMessage) {
          cachedValidationRef.current.push({
            reqKey: updatedParams,
            validationMessage: validationSyncMessage as ErrorMessages,
          });

          return validationSyncMessage;
        }

        if (!checkAsyncMemo) {
          return null;
        }

        const validationAsyncMessage = await checkAsyncMemo(updatedParams);

        if (validationAsyncMessage) {
          cachedValidationRef.current.push({
            reqKey: updatedParams,
            validationMessage: validationAsyncMessage as ErrorMessages,
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
        inputValueMemo,
      ],
    ),
  };
}
