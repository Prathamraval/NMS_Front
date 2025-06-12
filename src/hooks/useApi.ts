import { useState, useEffect } from 'react';
import { apiService, ApiResponse } from '../services/api';

export function useApiData<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      if (response.success) {
        setData(response.data || null);
      } else {
        setError(response.message || 'API call failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
}

export function useApiMutation<TRequest, TResponse>(
  apiCall: (data: TRequest) => Promise<ApiResponse<TResponse>>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (data: TRequest): Promise<TResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall(data);
      if (response.success) {
        return response.data || null;
      } else {
        setError(response.message || 'API call failed');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}