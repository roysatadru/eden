import { Fragment } from 'react';

import { Stepper } from '../components/stepper';
import { stepRoutesConfig } from '../constants/step-routes-config';
import { StepRoutes } from '../hoc/step-routes';
import { useStepsContext } from '../hooks/use-steps-context';
import { StepHeader } from '../layouts/step-header';
import { Congratulations } from './congratulations';

export function AllStepsHeader() {
  const [currentStep] = useStepsContext();

  return (
    <Fragment>
      <Stepper
        steps={stepRoutesConfig.map(function (step, index) {
          return {
            label: index + 1,
            value: step,
          };
        })}
        currentValue={currentStep}
      />

      <div
        className={`flex flex-col items-center text-center ${
          currentStep === 'congratulations'
            ? 'mt-40 mb-14'
            : 'mt-[9.5rem] mb-24'
        }`}
      >
        <StepRoutes
          welcome={
            <StepHeader
              heading="Welcome! First things first..."
              subHeading="You can always change them later."
            />
          }
          workDetails={
            <StepHeader
              heading="Let&rsquo;s set up a home for all your work"
              subHeading="You can always create another workspace later."
            />
          }
          plans={
            <StepHeader
              heading="How are you planning to use Eden?"
              subHeading="We&rsquo;ll streamline your setup experience accordingly."
            />
          }
          congratulations={<Congratulations />}
        />
      </div>
    </Fragment>
  );
}
