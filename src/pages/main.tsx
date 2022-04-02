import { MemoryRouter } from 'react-router';

import { MainLayout } from '../layouts/main-layout';
import { StepLayout } from '../layouts/step-layout';
import { UserContextProvider } from '../hoc/user-context';
import { AllStepsHeader } from '../partials/all-steps-header';
import { AllStepsBody } from '../partials/all-steps-body';

export function Main() {
  return (
    <MainLayout>
      <MemoryRouter>
        <UserContextProvider>
          <StepLayout header={<AllStepsHeader />}>
            <AllStepsBody />
          </StepLayout>
        </UserContextProvider>
      </MemoryRouter>
    </MainLayout>
  );
}
