import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Testimonials from './components/Testimonials/Testimonials';
import Collections from './components/Collections/Collections';
import ProductDetail from './components/Collections/ProductDetail';
import About from './pages/About/About';

function App() {

  return (
    <Router>
      <div className="shiva-enterprises-app">
        <Header />

        <main className="shiva-enterprises-main">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path='/about'
              element={<About />}
            />
            <Route
              path="/testimonials"
              element={<Testimonials />}
            />
            <Route
              path="/collections"
              element={<Collections />}
            />
            <Route
              path="/collections/:productId"
              element={<ProductDetail />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;