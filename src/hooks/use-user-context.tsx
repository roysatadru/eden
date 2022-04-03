import { useContext } from 'react';

import { UserContext } from '../hoc/user-context';

export function useUserContext() {
  return useContext(UserContext);
}
