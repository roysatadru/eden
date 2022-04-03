import { Button } from '../components/button';
import { TextField } from '../components/text-field';
import { useStepsContext } from '../hooks/use-steps-context';
import { useUserContext } from '../hooks/use-user-context';
import { FormLayout } from '../layouts/form-layout';

export function WelcomeFirst() {
  const [_, setCurrentStep] = useStepsContext();
  const [_1, setUser] = useUserContext();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setCurrentStep('workDetails');
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
