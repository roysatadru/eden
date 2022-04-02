import { Fragment } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import { Stepper } from '../components/stepper';
import { internalRoutes } from '../constants/internal-step-routes';
import { StepHeader } from '../layouts/step-header';
import { Congratulations } from './congratulations';

export function AllStepsHeader() {
  const { pathname } = useLocation();

  return (
    <Fragment>
      <Stepper
        steps={[
          {
            label: 1,
            value: internalRoutes.WELCOME,
          },
          {
            label: 2,
            value: internalRoutes.WORK_DETAILS,
          },
          {
            label: 3,
            value: internalRoutes.PLANS,
          },
          {
            label: 4,
            value: internalRoutes.CONGRATULATIONS,
          },
        ]}
        currentValue={pathname}
      />

      <div
        className={`flex flex-col items-center text-center ${
          pathname === internalRoutes.CONGRATULATIONS
            ? 'mt-40 mb-14'
            : 'mt-[9.5rem] mb-24'
        }`}
      >
        <Routes>
          <Route
            path={internalRoutes.WELCOME}
            element={
              <StepHeader
                heading="Welcome! First things first..."
                subHeading="You can always change them later."
              />
            }
          />
          <Route
            path={internalRoutes.WORK_DETAILS}
            element={
              <StepHeader
                heading="Let&rsquo;s set up a home for all your work"
                subHeading="You can always create another workspace later."
              />
            }
          />
          <Route
            path={internalRoutes.PLANS}
            element={
              <StepHeader
                heading="How are you planning to use Eden?"
                subHeading="We&rsquo;ll streamline your setup experience accordingly."
              />
            }
          />
          <Route
            path={internalRoutes.CONGRATULATIONS}
            element={<Congratulations />}
          />
        </Routes>
      </div>
    </Fragment>
  );
}
