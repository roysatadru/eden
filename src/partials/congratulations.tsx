import { Fragment } from 'react';
import { StepHeader } from '../layouts/step-header';
import { useUserContext } from '../hoc/user-context';

export function Congratulations() {
  const [user] = useUserContext();

  return (
    <Fragment>
      <div className="">
        <svg width="6.5rem" height="6.5rem" viewBox="0 0 18 18">
          <circle cx="9" cy="9" r="9" className="fill-primary" />
          <g transform="scale(0.4)" className="fill-white">
            <path d="M7.3125 13.5L2.25 8.43746L3.04537 7.64209L7.3125 11.9087L14.9546 4.26709L15.75 5.06246L7.3125 13.5Z" />
          </g>
        </svg>
      </div>

      <StepHeader
        heading={`Congratulations, ${user.name}!`}
        subHeading="You have completed onboarding, you can start using the Eden!"
      />
    </Fragment>
  );
}
