import { useCallback, useEffect, useState } from 'react';

export const useAsync = (asyncFunction, immediate = true) => {
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (params) => {
      setPending(true);
      setValue(null);
      setError(null);

      try {
        const response = await asyncFunction(params);

        setValue(response.data);
        setPending(true);

        return response.data;
      } catch (error) {
        setError(error?.response?.data?.errors);
        setPending(false);

        return {
          errors: error?.response?.data?.errors || { msg: 'Network Error' },
        };
      } finally {
        setPending(false);
      }
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, pending, value, error };
};
