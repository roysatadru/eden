import { Fragment } from 'react';

import { Button } from '../components/button';
import { TextField } from '../components/text-field';
import { useStepsContext } from '../hooks/use-steps-context';
import { FormLayout } from '../layouts/form-layout';

export function SetupHomeForWork() {
  const [_, setCurrentStep] = useStepsContext();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setCurrentStep('plans');
      }}
    >
      <FormLayout>
        <TextField
          id="workspace-name"
          label="Workspace Name"
          placeholder="Eden"
        />
        <TextField
          id="workspace-url"
          placeholder="Steve"
          label={
            <Fragment>
              Workspace URL <span className="text-[#b8c2d6]">(optional)</span>
            </Fragment>
          }
          startAdornment="www.eden.com/"
        />

        <Button className="w-full mt-10">Create Workspace</Button>
      </FormLayout>
    </form>
  );
}
