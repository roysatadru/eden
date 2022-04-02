import { ButtonHTMLAttributes } from 'react';

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = '' } = props;

  return (
    <button
      {...props}
      className={`h-[4.5rem] text-[1.4rem] px-8 flex items-center justify-center rounded-primary bg-primary hover:bg-primary-dark active:bg-primary-medium-dark focus:ring-2 focus:ring-primary focus:ring-offset-1 mouse-focus:ring-0 text-white transition duration-200 ${className}`}
    />
  );
}
