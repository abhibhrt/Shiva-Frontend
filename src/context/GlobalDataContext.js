import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAlert } from '../components/Alert/Alert';

const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
  const apiUrl = 'https://shiva-backend-g5i9.onrender.com';
  const { showAlert, AlertComponent } = useAlert();

  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [brandRes, productsRes, feedbackRes] = await Promise.all([
        fetch(`${apiUrl}/api/brand`).then(res => res.json()),
        fetch(`${apiUrl}/api/products`).then(res => res.json()),
        fetch(`${apiUrl}/api/feedback`).then(res => res.json()),
      ]);

      setBrand(brandRes);
      setProducts(productsRes);
      setFeedback(feedbackRes);
    } catch (err) {
      showAlert("Failed to fetch", 'error');
      setError('Something went wrong while loading global data.');
    } finally {
      setLoading(false);
    }
  }, [apiUrl, showAlert]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <GlobalDataContext.Provider
      value={{ brand, products, feedback, loading, error, refetch: fetchInitialData }}>
      {
        loading &&  <div className="loading-container">
        <span className="loader"></span>
        <p>Loading</p>
      </div>
      }
      <AlertComponent />
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalDataContext);
