import { StepRoutes } from '../hoc/step-routes';
import { PlanToUseEden } from './plan-to-use-eden';
import { SetupHomeForWork } from './setup-home-for-work';
import { WelcomeFirst } from './welcome-first';
import { LaunchButton } from './launch-button';

export function AllStepsBody() {
  return (
    <StepRoutes
      welcome={<WelcomeFirst />}
      workDetails={<SetupHomeForWork />}
      plans={<PlanToUseEden />}
      congratulations={<LaunchButton />}
    />
  );
}
