import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';

import { Button } from '../components/button';
import { TextField } from '../components/text-field';
import { useStepsContext } from '../hooks/use-steps-context';
import { useUserContext } from '../hooks/use-user-context';
import { FormLayout } from '../layouts/form-layout';
import { promisifiedSetTimeout } from '../utils/promisified-set-timeout';
import { RingLoader } from '../components/ring-loader';
import { useValidateInput, Messages } from '../hooks/use-validate-input';
import { fetchValidateUsername } from '../api/fetch-username-validate';

const initialValues = {
  name: '',
  username: '',
};

export function WelcomeFirst() {
  const [_, setCurrentStep] = useStepsContext();
  const [_1, setUser] = useUserContext();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
    setError,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const username = watch('username');

  const {
    errorMessage: usernameErrorMessage,
    isValidating: isUsernameValidating,
    isInputValid: isUsernameValid,
  } = useValidateInput({
    checkAsync: fetchValidateUsername,
    catchError: function () {
      return "Couldn't validate username";
    },
    checkSync: function (username) {
      return !username.trim().match(/^[a-zA-Z0-9_]+$/)
        ? 'Must only contain letters, numbers and underscores'
        : null;
    },
    inputValue: username.trim().toLowerCase(),
  });

  useEffect(() => {
    setFocus('name');

    return toast.remove;
  }, [setFocus]);

  const onSubmit = handleSubmit(async function ({ name, username }) {
    setLoading(true);

    try {
      const usernameValidationMessage = await isUsernameValid(
        username.trim().toLowerCase(),
      );

      if (usernameValidationMessage) {
        flushSync(() => {
          setLoading(false);
        });

        if (usernameValidationMessage === Messages.Loading) {
          return setFocus('username');
        }

        if (
          usernameValidationMessage === "Couldn't validate username" ||
          usernameValidationMessage === Messages.SomethingWentWrong
        ) {
          throw new Error(
            typeof usernameValidationMessage === 'string'
              ? usernameValidationMessage
              : 'Something went wrong! Please try again later...',
          );
        }

        return setError(
          'username',
          {
            type: 'username-error',
            message: usernameValidationMessage,
          },
          { shouldFocus: true },
        );
      }

      const response = await fetch('/api/typical-success-response.json');
      await promisifiedSetTimeout(2000);

      const json = (await response.json()) as { message?: string } | null;

      if (json?.message === 'Success') {
        setCurrentStep('workDetails');

        setUser(cur => ({
          ...cur,
          name: name
            .trim()
            .split(' ')
            .reduce(function (acc, cur) {
              return acc + cur.trim() + ' ';
            }, '')
            .trim(),
          username: username.trim(),
        }));
      } else {
        throw new Error('Something went wrong! Please try again later...');
      }
    } catch (error) {
      setLoading(false);

      toast.remove();

      if (error && error instanceof Error) {
        toast.error(error.message);
      }
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <FormLayout>
        <TextField
          id="name"
          placeholder="Steve Jobs"
          label="Full Name"
          {...register('name')}
          disabled={loading}
          error={errors.name?.message ?? false}
        />
        <TextField
          id="username"
          placeholder="Steve"
          label="Display Name"
          {...register('username')}
          disabled={loading}
          error={errors.username?.message ?? usernameErrorMessage ?? false}
          helperText={
            isUsernameValidating ? (
              <div className="flex text-[1.3rem] mt-2 text-current">
                <RingLoader loading className="text-[2rem] mr-3" />
                Validating display name...
              </div>
            ) : null
          }
        />

        <Button
          className="w-full mt-10"
          label="Create Workspace"
          loading={loading ? 'Creating workspace...' : false}
        />
      </FormLayout>
    </form>
  );
}

const validationSchema = object().shape({
  name: string()
    .trim()
    .required('Required field')
    .matches(/^[a-zA-Z ]+$/, {
      message: 'Must only contain letters, numbers and underscores',
      excludeEmptyString: true,
    }),
  username: string().trim().required('Required field'),
});
