import { ReactNode } from 'react';

interface StepLayoutProps {
  header: ReactNode;
  children: ReactNode;
}

export function StepLayout(props: StepLayoutProps) {
  const { header: headerElement, children: bodyElement } = props;

  return (
    <section className="flex flex-col">
      <header className="flex flex-col items-center text-center">
        {headerElement}
      </header>

      <div className={'max-w-[40rem] w-full self-center'}>{bodyElement}</div>
    </section>
  );
}
