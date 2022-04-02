import { Fragment } from 'react';
import { StepHeader } from '../layouts/step-header';
import { useUserContext } from '../hoc/user-context';

export function Congratulations() {
  const [user] = useUserContext();

  return (
    <Fragment>
      <div className="mb-24">
        <div className="w-[6.5rem] h-[6.5rem] text-white bg-primary rounded-full flex items-center justify-center">
          <svg
            width="2.5rem"
            height="2.5rem"
            className="block fill-current"
            viewBox="0 0 18 18"
          >
            <path d="M7.3125 13.5L2.25 8.43746L3.04537 7.64209L7.3125 11.9087L14.9546 4.26709L15.75 5.06246L7.3125 13.5Z" />
          </svg>
        </div>
      </div>

      <StepHeader
        heading={`Congratulations, ${user.name}!`}
        subHeading="You have completed onboarding, you can start using the Eden!"
      />
    </Fragment>
  );
}
