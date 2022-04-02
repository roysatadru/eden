import { Fragment } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '../components/button';
import { TextField } from '../components/text-field';
import { internalRoutes } from '../constants/internal-step-routes';
import { FormLayout } from '../layouts/form-layout';

export function SetupHomeForWork() {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        navigate(internalRoutes.PLANS);
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
