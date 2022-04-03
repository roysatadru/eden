import { MainLayout } from '../layouts/main-layout';
import { StepLayout } from '../layouts/step-layout';
import { UserContextProvider } from '../hoc/user-context';
import { StepsContextProvider } from '../hoc/step-context';
import { AllStepsHeader } from '../partials/all-steps-header';
import { AllStepsBody } from '../partials/all-steps-body';

export function Main() {
  return (
    <MainLayout>
      <UserContextProvider>
        <StepsContextProvider>
          <StepLayout header={<AllStepsHeader />}>
            <AllStepsBody />
          </StepLayout>
        </StepsContextProvider>
      </UserContextProvider>
    </MainLayout>
  );
}
