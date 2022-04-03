import { Fragment } from 'react';

import { Typography } from '../components/typography';

interface StepHeaderProps {
  heading: string;
  subHeading: string;
}

export function StepHeader(props: StepHeaderProps) {
  const { heading, subHeading } = props;

  return (
    <Fragment>
      <Typography
        variant="primary-heading"
        className="mb-3 sm-mobile:mb-5 mobile:mb-7 tablet:mb-8"
      >
        {heading}
      </Typography>
      <Typography variant="primary-sub-heading">{subHeading}</Typography>
    </Fragment>
  );
}
