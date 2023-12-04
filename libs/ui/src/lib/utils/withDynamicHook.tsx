/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithoutRef, useEffect, useState } from 'react';

// https://stackoverflow.com/questions/62298745/dynamic-import-of-react-hooks
export function withDynamicHook(
  hookName: string,
  importFunc: () => Promise<any>,
  Component: React.FC,
) {
  return (props: PropsWithoutRef<any>) => {
    const [hook, setHook] = useState();

    useEffect(() => {
      importFunc().then((mod) => setHook(() => mod[hookName]));
    }, []);

    if (!hook) {
      return null;
    }

    const newProps = { ...props, [hookName]: hook };
    return <Component {...newProps} />;
  };
}
