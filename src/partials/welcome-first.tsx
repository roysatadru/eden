import { useEffect, useState } from 'react';
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
import { useValidateUsername } from '../hooks/use-validate-username';

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
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const username = watch('username');

  const { usernameErrorMessage, isUsernameValidating, isUsernameValid } =
    useValidateUsername(username);

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const onSubmit = handleSubmit(async function ({ name, username }) {
    if (!isUsernameValid(username)) {
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
