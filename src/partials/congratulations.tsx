import { Fragment } from 'react';

import { StepHeader } from '../layouts/step-header';
import { useUserContext } from '../hooks/use-user-context';

export function Congratulations() {
  const [user] = useUserContext();

  const nameOfUser = (user.name || 'Eren').split(' ')[0];
  const displayName = nameOfUser[0].toUpperCase() + nameOfUser.slice(1);

  const svgClassName =
    'block stroke-white rounded-full [stroke-miterlimit:10] shadow-[inset_0_0_0_theme(colors.primary.DEFAULT)] animate-[fill_.4s_ease-in-out_.4s_forwards,_scale_.3s_ease-in-out_.9s_both]';

  return (
    <Fragment>
      <div className="mb-24">
        <div className="text-white flex items-center justify-center relative">
          <svg
            width="6.5rem"
            height="6.5rem"
            className={`stroke-2 ${svgClassName}`}
            viewBox="0 0 66 66"
          >
            <circle
              cx="33"
              cy="33"
              r="32"
              className="[stroke-dasharray:205] [stroke-dashoffset:205] stroke-2 [stroke-miterlimit:10] stroke-primary [fill:none] animate-[stroke_.6s_cubic-bezier(0.650,0.000,0.450,1.000)_forwards]"
            />
          </svg>
          <svg
            width="2.5rem"
            height="2.5rem"
            className={`fill-current absolute stroke-1 ${svgClassName}`}
            viewBox="0 0 18 18"
          >
            <path
              fill="none"
              d="M7.3125 13.5L2.25 8.43746L3.04537 7.64209L7.3125 11.9087L14.9546 4.26709L15.75 5.06246L7.3125 13.5Z"
              className="origin-center [stroke-dasharray:60] [stroke-dashoffset:60] animate-[stroke_.3s_cubic-bezier(0.650,0.000,0.450,1.000)_.8s_forwards]"
            />
          </svg>
        </div>
      </div>

      <StepHeader
        heading={`Congratulations, ${displayName}!`}
        subHeading="You have completed onboarding, you can start using the Eden!"
      />
    </Fragment>
  );
}
