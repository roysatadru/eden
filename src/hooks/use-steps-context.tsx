import { useContext } from 'react';

import { StepsContext } from '../hoc/step-context';

export function useStepsContext() {
  return useContext(StepsContext);
}
