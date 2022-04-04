import { Fragment, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../components/button';
import { TextField } from '../components/text-field';
import { useStepsContext } from '../hooks/use-steps-context';
import { FormLayout } from '../layouts/form-layout';
import { promisifiedSetTimeout } from '../utils/promisified-set-timeout';
import { useUserContext } from '../hooks/use-user-context';

const cachedUrlNotAvailable = [] as string[];

const initialValues = {
  workspaceName: '',
  workspaceUrlSlug: '',
};

export function SetupHomeForWork() {
  const [_, setCurrentStep] = useStepsContext();
  const [_1, setUser] = useUserContext();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setError,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setFocus('workspaceName');
  }, [setFocus]);

  const onSubmit = handleSubmit(async function ({
    workspaceName,
    workspaceUrlSlug,
  }) {
    setLoading(true);

    try {
      if (workspaceUrlSlug.trim()) {
        /* normally, this shouldn't be done... but for this example, it's ok
        we should use a real API and backend to check if the username is taken */

        const urlResponse = await fetch('/api/is-url-available.json');
        await promisifiedSetTimeout(2000);

        const urlJson = (await urlResponse.json()) as {
          urls?: { slug?: string }[];
        } | null;

        if (
          urlJson?.urls?.find?.(
            url =>
              url?.slug?.toLowerCase?.() ===
              workspaceUrlSlug.trim().toLowerCase(),
          )
        ) {
          flushSync(() => {
            setLoading(false);
          });

          cachedUrlNotAvailable.push(workspaceUrlSlug.trim().toLowerCase());

          return setError(
            'workspaceUrlSlug',
            {
              type: 'not-unique',
              message: 'This URL is already taken',
            },
            { shouldFocus: true },
          );
        }
      }

      const response = await fetch('/api/typical-success-response.json');
      await promisifiedSetTimeout(2000);

      const json = (await response.json()) as { message?: string } | null;

      if (json?.message === 'Success') {
        setCurrentStep('plans');

        setUser(cur => ({
          ...cur,
          workspaceName: workspaceName.trim(),
          workspaceUrlSlug: workspaceUrlSlug.trim(),
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
          id="workspace-name"
          label="Workspace Name"
          placeholder="Eden"
          disabled={loading}
          {...register('workspaceName')}
          error={errors.workspaceName?.message ?? false}
        />

        <TextField
          id="workspace-url"
          placeholder="Example"
          label={
            <Fragment>
              Workspace URL <span className="text-[#b8c2d6]">(optional)</span>
            </Fragment>
          }
          startAdornment="www.eden.com/"
          disabled={loading}
          {...register('workspaceUrlSlug')}
          error={errors.workspaceUrlSlug?.message ?? false}
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
  workspaceName: string()
    .trim()
    .required('Workspace Name is required')
    .matches(/^[a-zA-Z0-9]+$/, {
      message: 'Workspace Name can only contain letters and numbers',
      excludeEmptyString: true,
    }),
  workspaceUrlSlug: string()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Invalid Workspace URL',
      excludeEmptyString: true,
    })
    .test('not-unique', 'This URL is already taken', function (urlSlug) {
      if (!urlSlug) {
        return true;
      } else {
        return !cachedUrlNotAvailable.includes(urlSlug);
      }
    }),
});
