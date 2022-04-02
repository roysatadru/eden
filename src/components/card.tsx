import { ReactNode } from 'react';

type CardProps<Tag extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[Tag] & {
    tag?: Tag;
    children: ReactNode;
  };

export function Card<Tag extends keyof JSX.IntrinsicElements = 'div'>(
  props: CardProps<Tag>,
) {
  const { tag = 'div', children, className = '', ...rest } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = tag as any;

  return (
    <Component
      {...rest}
      className={`block p-[2.4rem] border border-gray-200 rounded-primary transition-all duration-300 ${
        className ?? ''
      }`}
    >
      {children}
    </Component>
  );
}
