import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import { translations } from './data/translations';
import Testimonials from './components/Testimonials/Testimonials';
import Collections from './components/Collections/Collections';
import ProductDetail from './components/Collections/ProductDetail';

function App() { 
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'hi' : 'en');
  };

  const t = (key) => {
    return translations[key][language] || key;
  };

  return (
    <Router>
      <div className="shiva-enterprises-app">
        <Header t={t} toggleLanguage={toggleLanguage} language={language} />
        
        <main className="shiva-enterprises-main">
          <Routes>
            <Route 
              path="/" 
              element={<Home t={t} language={language} />} 
            />
            <Route 
              path="/testimonials" 
              element={<Testimonials t={t} />} 
            />
            <Route 
              path="/collections" 
              element={<Collections t={t} />} 
            />
            <Route 
              path="/collections/:productId" 
              element={<ProductDetail t={t} />} 
            />
            {/* Add more routes as needed */}
          </Routes>
        </main>

        <Footer t={t} language={language} toggleLanguage={toggleLanguage} />
      </div>
    </Router>
  );
}

export default App;