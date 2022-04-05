import { useEffect, useState, useRef, useCallback } from 'react';

import { fetchValidateUsername } from '../api/fetch-username-validate';

type CompleteValidationsMessagesType = {
  inputValue: string;
  validationMessage: string;
}[];

export function useValidateUsername(username: string) {
  const [notLoadingInputValidations, setNotLoadingInputValidations] = useState(
    [] as string[],
  );

  const completeValidationsMessagesRef =
    useRef<CompleteValidationsMessagesType>([]);

  useEffect(
    function () {
      const trimmedUsername = username.trim();

      if (trimmedUsername) {
        if (
          completeValidationsMessagesRef.current.find(
            ({ inputValue, validationMessage }) =>
              inputValue.toLowerCase() === trimmedUsername.toLowerCase() &&
              validationMessage !== "Couldn't validate username",
          )
        ) {
          return;
        }

        if (!trimmedUsername.match(/^[a-zA-Z0-9_]+$/)) {
          completeValidationsMessagesRef.current.push({
            inputValue: trimmedUsername,
            validationMessage:
              'Display Name can only contain letters, numbers and underscores',
          });

          return;
        }

        const timeout = setTimeout(function () {
          fetchValidateUsername(trimmedUsername.toLowerCase()).then(function (
            data,
          ) {
            if (data) {
              completeValidationsMessagesRef.current.push({
                inputValue: trimmedUsername,
                validationMessage: data,
              });
            }

            setNotLoadingInputValidations(cur => [...cur, trimmedUsername]);
          });
        }, 500);

        return () => {
          clearTimeout(timeout);
        };
      }
    },
    [username],
  );

  const isUsernameLoading = useCallback(
    function isUsernameLoading(username: string) {
      const trimmedLowerCaseUsername = username.trim().toLowerCase();

      if (!trimmedLowerCaseUsername) {
        return false;
      }

      return !notLoadingInputValidations.find(
        uname => uname.toLowerCase() === trimmedLowerCaseUsername,
      );
    },
    [notLoadingInputValidations],
  );

  const getErrorMessage = useCallback(function getErrorMessage(
    username: string,
  ) {
    return completeValidationsMessagesRef.current.find(
      vchecks =>
        vchecks.inputValue.toLocaleLowerCase() ===
        username.trim().toLowerCase(),
    )?.validationMessage;
  },
  []);

  return {
    isUsernameValidating: isUsernameLoading(username),

    usernameErrorMessage: getErrorMessage(username) ?? null,

    isUsernameValid: useCallback(
      function (username: string) {
        return !isUsernameLoading(username) && !getErrorMessage(username);
      },
      [getErrorMessage, isUsernameLoading],
    ),
  };
}
