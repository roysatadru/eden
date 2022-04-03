import { Fragment } from 'react';

interface RingLoaderProps {
  loading?: boolean;
  className?: string;
}

export function RingLoader(props: RingLoaderProps) {
  const { loading = false, className } = props;

  return loading ? (
    <span className={`inline-block w-[1em] h-[1em] leading-none ${className}`}>
      <span className="animate-hourglass-primary motion-reduce:hidden block w-0 h-0 m-[0.1em] rounded-full box-border border-[0.4em] border-l-transparent border-r-transparent border-t-current border-b-current" />
    </span>
  ) : (
    <Fragment />
  );
}
