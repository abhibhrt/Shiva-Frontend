import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Feedback from './components/Feedbacks/Feedbacks';
import Collections from './components/Collections/Collections';
import ProductDetail from './components/Collections/ProductDetail';
import { GlobalDataProvider } from './context/GlobalDataContext';
import Contact from './components/Contact/Contact';
import AdminDashboard from './admin/adminDashboard';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <GlobalDataProvider>
      <Router>
        <div className="shiva-enterprises-app">
          <Header />
          <ScrollToTop /> {/* Add this component here */}
          <main className="shiva-enterprises-main">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/feedbacks"
                element={<Feedback />}
              />
              <Route
                path="/collections"
                element={<Collections />}
              />
              <Route
                path="/collections/:productId"
                element={<ProductDetail />}
              />
              <Route
                path='/contact'
                element={<Contact />}
              />
              <Route
                path='/admin'
                element={<AdminDashboard/>}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GlobalDataProvider>
  );
}

export default App;