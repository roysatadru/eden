import { promisifiedSetTimeout } from '../utils/promisified-set-timeout';

// logic that should be executed on the server
export async function fetchURLValidate(workspaceUrlSlug: string) {
  try {
    const response = await fetch('/api/is-url-available.json');

    // emulating api call delay
    await promisifiedSetTimeout(2000);

    const json = (await response.json()) as {
      urls?: { slug?: string }[];
    } | null;

    if (json?.urls?.find?.(url => url?.slug === workspaceUrlSlug.trim())) {
      return 'This URL is already taken';
    } else {
      return null;
    }
  } catch (error) {
    return "Couldn't validate the URL";
  }
}
