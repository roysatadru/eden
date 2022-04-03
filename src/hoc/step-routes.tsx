import { Fragment } from 'react';

import { stepRoutesConfig } from '../constants/step-routes-config';
import { useStepsContext } from '../hooks/use-steps-context';

type StepRoutesProps = {
  [path in typeof stepRoutesConfig[number]]?: JSX.Element;
};

export function StepRoutes(props: StepRoutesProps): JSX.Element {
  const [currentStep] = useStepsContext();

  return props[currentStep] ?? <Fragment />;
}
