import { promisifiedSetTimeout } from '../utils/promisified-set-timeout';

// logic that should be executed on the server
export async function fetchValidateUsername(username: string) {
  const response = await fetch('/api/is-user-available.json');

  // emulating api call delay
  await promisifiedSetTimeout(2000);

  const json = (await response.json()) as {
    users?: { id?: number; name?: string; username?: string }[];
  } | null;

  if (json?.users?.find?.(user => user?.username?.toLowerCase() === username)) {
    return `${username} is already taken`;
  } else {
    return null;
  }
}
