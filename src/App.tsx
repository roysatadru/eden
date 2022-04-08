import { Fragment } from 'react';
import { Toaster } from 'react-hot-toast';

import { HomePage } from './pages';

export function App() {
  return (
    <Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <HomePage />
    </Fragment>
  );
}
