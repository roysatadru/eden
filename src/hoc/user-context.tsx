import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface UserContextProviderProps {
  children: ReactNode;
}

const userInitialState = { name: '' };
const initialState = [
  userInitialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
] as [
  typeof userInitialState,
  Dispatch<SetStateAction<typeof userInitialState>>,
];

export const UserContext = createContext(initialState);

export function UserContextProvider(props: UserContextProviderProps) {
  const { children } = props;

  const user = useState(userInitialState);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
