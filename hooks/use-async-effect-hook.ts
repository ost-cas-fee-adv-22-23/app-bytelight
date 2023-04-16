import { useEffect } from 'react';

export const useAsyncEffect = (callBackFunction: () => Promise<unknown>, deps?: React.DependencyList) => {
  useEffect(() => {
    callBackFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
