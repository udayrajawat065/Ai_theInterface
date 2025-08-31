import { useState, useEffect } from 'react';

interface UseDataOptions {
  initialData?: any;
  fetchOnMount?: boolean;
}

export function useData<T>(
  fetchFn: () => Promise<T>,
  options: UseDataOptions = {}
) {
  const [data, setData] = useState<T | null>(options.initialData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.fetchOnMount) {
      refetch();
    }
  }, []);

  return { data, loading, error, refetch };
}