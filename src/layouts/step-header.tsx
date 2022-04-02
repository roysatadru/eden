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
      <Typography variant="primary-heading" className="mb-8">
        {heading}
      </Typography>
      <Typography variant="primary-sub-heading">{subHeading}</Typography>
    </Fragment>
  );
}
