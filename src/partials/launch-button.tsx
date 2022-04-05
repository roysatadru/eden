import { useEffect, useRef } from 'react';

import { Button } from '../components/button';

export function LaunchButton() {
  const lauchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(function () {
    if (lauchButtonRef.current) {
      lauchButtonRef.current.focus();
    }
  }, []);

  return (
    <Button ref={lauchButtonRef} className="w-full">
      Launch Eden
    </Button>
  );
}
