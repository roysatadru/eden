import { FormEvent, useEffect, useRef, useState } from 'react';

import { Button } from '../components/button';
import { Card } from '../components/card';
import { Typography } from '../components/typography';
import { planToUseEdenOptions } from '../constants/plan-to-use-eden-options';
import { useStepsContext } from '../hooks/use-steps-context';
import { useUserContext } from '../hooks/use-user-context';
import { promisifiedSetTimeout } from '../utils/promisified-set-timeout';

export function PlanToUseEden() {
  const [_, setCurrentStep] = useStepsContext();
  const [_1, setUser] = useUserContext();

  const firstOptionRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  useEffect(function () {
    if (firstOptionRef.current) {
      firstOptionRef.current.focus();
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const eventTargetSelected = (
      event.target as HTMLFormElement | undefined
    )?.querySelector?.('input:checked') as HTMLInputElement | null;

    if (eventTargetSelected) {
      setLoading(true);

      try {
        const response = await fetch('/api/typical-success-response.json');
        await promisifiedSetTimeout(2000);

        const json = (await response.json()) as { message?: string } | null;

        if (json?.message === 'Success') {
          setCurrentStep('congratulations');

          setUser(cur => ({
            ...cur,
            selectedPlan: eventTargetSelected.value,
          }));
        } else {
          throw new Error('Something went wrong! Please try again later...');
        }
      } catch (error) {
        setLoading(false);
        // TODO: show error toast
        // console.error(error);
      }
    }
  }

  return (
    <form name="plan" onSubmit={handleSubmit}>
      <fieldset name="plan" className="border-0 w-full">
        <legend className="sr-only">Please select an option</legend>

        <ul className="flex flex-col mobile:flex-row except-last-children:mb-10 mobile:except-last-children:mb-0 justify-between">
          {planToUseEdenOptions.map(function (
            { icon, heading, text, value },
            index,
          ) {
            return (
              <li key={value} className="basis-[calc(50%-1.5rem)]">
                <input
                  ref={index === 0 ? firstOptionRef : undefined}
                  type="radio"
                  name="plan"
                  id={value}
                  value={value}
                  defaultChecked={index === 0}
                  className="sr-only peer"
                  disabled={loading}
                />
                <Card
                  tag="label"
                  htmlFor={value}
                  className="flex flex-col h-full cursor-pointer select-none text-gray-600 peer-disabled:cursor-auto peer-checked:border-primary peer-checked:cursor-auto peer-checked:text-primary peer-checked:-mt-px peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-1"
                >
                  <div className="flex justify-start mb-12 pl-2">{icon}</div>
                  <Typography
                    variant="secondary-heading"
                    className="mb-4 mobile:mb-6"
                  >
                    {heading}
                  </Typography>
                  <Typography variant="secondary-sub-text">{text}</Typography>
                </Card>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <Button
        className="w-full mt-10"
        label="Create Workspace"
        loading={loading ? 'Creating workspace...' : false}
      />
    </form>
  );
}
