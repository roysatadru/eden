import { ReactNode } from 'react';

import { Logo } from '../components/logo';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout(props: MainLayoutProps) {
  const { children } = props;

  return (
    <div className="min-h-screen py-36 flex flex-col items-center">
      <header>
        <div className='-ml-8'>
          <Logo />
        </div>
      </header>

      <main className="mt-32 flex flex-col">{children}</main>
    </div>
  );
}
