import {
  ButtonHTMLAttributes,
  forwardRef,
  Fragment,
  ReactNode,
  Ref,
} from 'react';

import { RingLoader } from './ring-loader';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  loading?: boolean | string;
} & (
    | {
        label: string;
      }
    | { children: ReactNode }
  );

function ButtonForRef(props: ButtonProps, ref: Ref<HTMLButtonElement>) {
  const { className = '', loading = false, ...rest } = props;

  return (
    <button
      ref={ref}
      disabled={!!loading}
      title={
        typeof loading === 'string'
          ? loading
          : loading
          ? 'Loading...'
          : undefined
      }
      {...rest}
      className={`h-[4.5rem] text-[1.4rem] px-8 select-none flex items-center justify-center rounded-primary bg-primary disabled:bg-gray-200 disabled:text-gray-300 hover:bg-primary-dark active:bg-primary-medium-dark focus:ring-2 focus:ring-primary focus:ring-offset-1 mouse-focus:ring-0 text-white transition duration-200 ${className}`}
    >
      {'label' in props ? (
        <Fragment>
          <RingLoader loading={!!loading} className="text-[2rem] mr-3" />
          {props.label}
        </Fragment>
      ) : (
        props.children
      )}
    </button>
  );
}

export const Button = forwardRef(ButtonForRef);
