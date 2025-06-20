import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Feedback from './components/Feedbacks/Feedbacks';
import Collections from './components/Collections/Collections';
import ProductDetail from './components/Collections/ProductDetail';
import NewProductForm from './admin/newProduct';
import { GlobalDataProvider } from './context/GlobalDataContext';
import Contact from './components/Contact/Contact';
import Login from './admin/Login';

function App() {

  return (
    <GlobalDataProvider>
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
                path='/products'
                element={<NewProductForm />}
              />
              <Route
                path='/contact'
                element={<Contact />}
              />
              <Route
                path='/login'
                element={<Login />}
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