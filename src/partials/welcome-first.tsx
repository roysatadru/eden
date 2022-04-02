import { useNavigate } from 'react-router';

import { Button } from '../components/button';
import { TextField } from '../components/text-field';
import { internalRoutes } from '../constants/internal-step-routes';
import { useUserContext } from '../hoc/user-context';
import { FormLayout } from '../layouts/form-layout';

export function WelcomeFirst() {
  const navigate = useNavigate();

  const [_, setUser] = useUserContext();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        navigate(internalRoutes.WORK_DETAILS);
        setUser(cur => ({
          ...cur,
          name: (
            document.getElementById('name') as HTMLInputElement
          ).value.trim(),
        }));
      }}
    >
      <FormLayout>
        <TextField id="name" placeholder="Steve Jobs" label="Full Name" />
        <TextField id="username" placeholder="Steve" label="Display Name" />

        <Button className="w-full mt-10">Create Workspace</Button>
      </FormLayout>
    </form>
  );
}
