import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import { stepRoutesConfig } from '../constants/step-routes-config';

interface StepsContextProviderProps {
  children: ReactNode;
}

const stepInitialState = 'welcome' as typeof stepRoutesConfig[number];
const initialState = [
  stepInitialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
] as [
  typeof stepInitialState,
  Dispatch<SetStateAction<typeof stepInitialState>>,
];

export const StepsContext = createContext(initialState);

export function StepsContextProvider(props: StepsContextProviderProps) {
  const { children } = props;

  const stepsState = useState(stepInitialState);

  return (
    <StepsContext.Provider value={stepsState}>{children}</StepsContext.Provider>
  );
}
