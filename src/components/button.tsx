import { ButtonHTMLAttributes, Fragment, ReactNode } from 'react';

import { RingLoader } from './ring-loader';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  loading?: boolean;
} & (
    | {
        label: string;
      }
    | { children: ReactNode }
  );

export function Button(props: ButtonProps) {
  const { className = '', loading = false, ...rest } = props;

  return (
    <button
      disabled={loading}
      title={loading ? 'Loading...' : undefined}
      {...rest}
      className={`h-[4.5rem] text-[1.4rem] px-8 flex items-center justify-center rounded-primary bg-primary disabled:bg-gray-200 disabled:text-gray-300 hover:bg-primary-dark active:bg-primary-medium-dark focus:ring-2 focus:ring-primary focus:ring-offset-1 mouse-focus:ring-0 text-white transition duration-200 ${className}`}
    >
      {'label' in props ? (
        <Fragment>
          <RingLoader loading={loading} className="text-[2rem] mr-3" />
          {props.label}
        </Fragment>
      ) : (
        props.children
      )}
    </button>
  );
}
