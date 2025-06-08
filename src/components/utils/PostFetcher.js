import { useEffect, useState } from 'react';

export function usePostFetcher(apiUrl, payload) {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!apiUrl || !payload) return;

    const controller = new AbortController();
    const postData = async () => {
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        const data = await res.json();

        if (!res.ok) {
          setResponse({ status: 'error', message: data.message || `Status: ${res.status}` });
        } else {
          setResponse({ status: 'success', message: data.message || 'Submitted successfully', data: data.data });
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setResponse({ status: 'error', message: err.message || 'Submission failed' });
        }
      }
    };

    postData();

    return () => {
      controller.abort();
    };
  }, [apiUrl, payload]);

  return response;
}