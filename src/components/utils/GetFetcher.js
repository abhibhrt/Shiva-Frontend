import { useEffect, useState } from 'react';

// This hook fetches a GET API and returns `brand` data
export function GetFetcher({apiUrl}) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        setError(null);

      } catch (err) {
        setError(err.message || 'Error in fetching');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { data, loading, error };
}
