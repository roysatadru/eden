import { ReactNode } from 'react';

interface FormLayoutProps {
  children: ReactNode;
}

export function FormLayout(props: FormLayoutProps) {
  const { children } = props;

  return <div className="except-last-children:mb-8">{children}</div>;
}
