import { ReactNode } from 'react';

interface TypographyProps {
  variant:
    | 'primary-heading'
    | 'primary-sub-heading'
    | 'secondary-heading'
    | 'secondary-sub-text';
  children: ReactNode;
  className?: string;
}

export function Typography(props: TypographyProps) {
  const { children, className = '', variant } = props;

  switch (variant) {
    case 'primary-heading':
      return (
        <h1
          className={`font-bold text-gray-800 text-[1.75rem] sm-mobile:text-[2rem] mobile:text-4xl tablet:text-5xl tablet:leading-none ${className}`}
        >
          {children}
        </h1>
      );

    case 'secondary-heading':
      return (
        <h2
          className={`text-[1.4rem] mobile:text-[1.6rem] font-bold text-gray-700 leading-none ${className}`}
        >
          {children}
        </h2>
      );

    case 'primary-sub-heading':
      return (
        <p
          className={`text-[1.3rem] sm-mobile:text-[1.5rem] tablet:text-[1.6rem] text-gray-400 tablet:leading-none ${className}`}
        >
          {children}
        </p>
      );

    case 'secondary-sub-text':
      return (
        <p
          className={`text-gray-400 text-[1.3rem] mobile:text-[1.4rem] ${className}`}
        >
          {children}
        </p>
      );

    default:
      return null;
  }
}
