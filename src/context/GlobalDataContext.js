import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAlert } from '../components/Alert/Alert';

const GlobalDataContext = createContext();

// Utility: Fetch with Timeout
const fetchWithTimeout = async (resource, options = {}, timeout = 15000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(id);
  }
};

export const GlobalDataProvider = ({ children }) => {
  const apiUrl = 'https://shiva-backend-g5i9.onrender.com';
  const { showAlert, AlertComponent } = useAlert();

  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MIN_LOADING_TIME = 1000; // Ensures spinner shows for at least 1s

  const fetchInitialData = useCallback(async () => {
    const startTime = Date.now();
    try {
      setLoading(true);
      setError(null);

      const [brandRes, productsRes, feedbackRes] = await Promise.all([
        fetchWithTimeout(`${apiUrl}/api/brand`),
        fetchWithTimeout(`${apiUrl}/api/products`),
        fetchWithTimeout(`${apiUrl}/api/feedback`)
      ]);

      setBrand(brandRes);
      setProducts(productsRes);
      setFeedback(feedbackRes);
    } catch (err) {
      if (err.name === 'AbortError') {
        showAlert("Request timed out", 'error');
      } else {
        showAlert("Failed to fetch data", 'error');
      }
      setError('Something went wrong while loading global data.');
    } finally {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, MIN_LOADING_TIME - elapsed);
      setTimeout(() => setLoading(false), delay);
    }
  }, [apiUrl, showAlert]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <GlobalDataContext.Provider
      value={{ brand, products, feedback, loading, error, refetch: fetchInitialData }}
    >
      {loading && (
        <div className="loading-container">
          <span className="loader"></span>
          <p>Loading...</p>
        </div>
      )}
      <AlertComponent />
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalDataContext);
