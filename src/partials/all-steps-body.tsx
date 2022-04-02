import { Route, Routes } from 'react-router';

import { internalRoutes } from '../constants/internal-step-routes';
import { PlanToUseEden } from './plan-to-use-eden';
import { SetupHomeForWork } from './setup-home-for-work';
import { WelcomeFirst } from './welcome-first';
import { Button } from '../components/button';

export function AllStepsBody() {
  return (
    <Routes>
      <Route path={internalRoutes.WELCOME} element={<WelcomeFirst />} />
      <Route
        path={internalRoutes.WORK_DETAILS}
        element={<SetupHomeForWork />}
      />
      <Route path={internalRoutes.PLANS} element={<PlanToUseEden />} />
      <Route
        path={internalRoutes.CONGRATULATIONS}
        element={<Button className="w-full">Launch Eden</Button>}
      />
    </Routes>
  );
}
