import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../components/button';
import { TextField } from '../components/text-field';
import { useStepsContext } from '../hooks/use-steps-context';
import { useUserContext } from '../hooks/use-user-context';
import { FormLayout } from '../layouts/form-layout';
import { promisifiedSetTimeout } from '../utils/promisified-set-timeout';
import { RingLoader } from '../components/ring-loader';
import { useCacheValidations } from '../hooks/use-cache-validations';

const initialCachedValidationsState = {
  '': { fetching: false, results: false },
};

const initialValues = {
  name: '',
  username: '',
};

function validateUserNameSchema(input: string) {
  return !input.match(/^[a-zA-Z0-9_]+$/) && input.trim() !== ''
    ? 'Username can only contain letters, numbers and underscores'
    : null;
}

export function WelcomeFirst() {
  const [_, setCurrentStep] = useStepsContext();
  const [_1, setUser] = useUserContext();

  const { cachedValidations, dispatchCachedValidations } = useCacheValidations({
    initialCachedValidationsState,
  });

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const username = watch('username');
  const isUserNameValidating =
    cachedValidations[username.toLowerCase()]?.fetching ?? false;
  const isUserNameNotAvailable =
    cachedValidations[username.toLowerCase()]?.results ?? false;

  /* normally, this shouldn't be done... but for this example, it's ok
   we should use a real API and backend to check if the username is taken */

  const checkUserName = useCallback(
    async function checkUserName(username) {
      try {
        const response = await fetch('/api/is-user-available.json');
        await promisifiedSetTimeout(2000);

        const json = (await response.json()) as {
          users?: { id?: number; name?: string; username?: string }[];
        } | null;

        return dispatchCachedValidations({
          type: 'set-result',
          key: username.toLowerCase(),
          result: !(
            json?.users?.every?.(
              user =>
                user?.username?.toLowerCase?.() !== username.toLowerCase(),
            ) ?? false
          ),
        });
      } catch (error) {
        // TODO: show error toast
        dispatchCachedValidations({
          type: 'stop-fetching',
          key: username.toLowerCase(),
        });
      }
    },
    [dispatchCachedValidations],
  );

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  useEffect(
    function () {
      if (username) {
        dispatchCachedValidations({
          type: 'start-fetching',
          key: username.toLowerCase(),
        });

        const errorMessage = validateUserNameSchema(username);

        if (errorMessage) {
          dispatchCachedValidations({
            type: 'set-result',
            key: username.toLowerCase(),
            result: false,
          });
        }

        if (
          typeof cachedValidations[username.toLowerCase()]?.results ===
          'boolean'
        ) {
          dispatchCachedValidations({
            type: 'stop-fetching',
            key: username.toLowerCase(),
          });
          return;
        }

        const timeout = setTimeout(() => checkUserName(username), 500);

        return () => {
          dispatchCachedValidations({
            type: 'stop-fetching',
            key: username.toLowerCase(),
          });
          clearTimeout(timeout);
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkUserName, username],
  );

  const onSubmit = handleSubmit(async function ({ name, username }) {
    if (cachedValidations[username.toLowerCase()]?.results) {
      setFocus('username');
      return;
    }

    setLoading(true);

    try {
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
              return acc + cur.trim();
            }, ''),
          username: username.trim(),
        }));
      } else {
        throw new Error('Something went wrong! Please try again later...');
      }
    } catch (error) {
      setLoading(false);
      // TODO: show error toast
      // console.error(error);
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
          disabled={loading || isUserNameValidating}
          error={errors.name?.message ?? false}
        />
        <TextField
          id="username"
          placeholder="Steve"
          label="Display Name"
          {...register('username')}
          disabled={loading}
          error={
            errors.username?.message ??
            validateUserNameSchema(username) ??
            (isUserNameNotAvailable ? `${username} is already taken` : false)
          }
          helperText={
            isUserNameValidating ? (
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
          {...(isUserNameValidating ? { disabled: true } : {})}
          loading={loading}
        />
      </FormLayout>
    </form>
  );
}

const validationSchema = object().shape({
  name: string()
    .trim()
    .required('Full Name is required')
    .matches(/^[a-zA-Z ]+$/, {
      message: 'Only alphabets are allowed',
      excludeEmptyString: true,
    }),
  username: string().trim().required('Display Name is required'),
});
