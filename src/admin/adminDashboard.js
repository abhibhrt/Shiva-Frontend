import { useState } from 'react';
import './dashboard.css';
import NewProductForm from './newProduct';
import BrandForm from './BrandForm';
import { useAlert } from '../components/Alert/Alert';

const AdminDashboard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showAlert, AlertComponent } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('adminAuthenticated') === 'true'
  );
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      if (email === 'shivaenterprises7371@gmail.com' && password === 'admin7371') {
        showAlert('Authentication successfull', 'success');
        localStorage.setItem('adminAuthenticated', 'true');
        setIsAuthenticated(true);
      } else {
        showAlert('Invalid credentials', 'error');
        setEmail('');
        setPassword('');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    setActiveSection('dashboard');
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <AlertComponent/>
        <div className="admin-login-card">
          <div className="admin-login-header">
            <h2 className="admin-login-title">Admin Portal</h2>
            <p className="admin-login-subtitle">Restricted Access</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-form-group">
              <label htmlFor="email" className="admin-form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-form-input"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password" className="admin-form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="admin-form-options">
              <a href="#forgot-password" className="admin-forgot-password">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="admin-login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <AlertComponent/>
      <header className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <button onClick={handleLogout} className="admin-logout-button">
          Logout
        </button>
      </header>

      <nav className="admin-navigation">
        <button
          className={`admin-nav-button ${activeSection === 'products' ? 'active' : ''}`}
          onClick={() => setActiveSection('products')}>
          Add New Product
        </button>
        <button
          className={`admin-nav-button ${activeSection === 'ratings' ? 'active' : ''}`}
          onClick={() => setActiveSection('ratings')}>
          Review & Ratings
        </button>
        <button
          className={`admin-nav-button ${activeSection === 'brands' ? 'active' : ''}`}
          onClick={() => setActiveSection('brands')}>
          Update Brand Details
        </button>
      </nav>

      <main className="admin-main-content">
        {activeSection === 'dashboard' && (
          <div className="admin-welcome-message">
            <h2>Welcome to Admin Dashboard</h2>
            <p>Select a section from the navigation to get started.</p>
          </div>
        )}

        {activeSection === 'products' && (
          <div className="admin-section">
            <h2>Product Management</h2>
            <NewProductForm />
          </div>
        )}

        {activeSection === 'ratings' && (
          <div className="admin-section">
            <h2>Review & Ratings</h2>
            {/* Ratings management would go here */}
          </div>
        )}

        {activeSection === 'brands' && (
          <div className="admin-section">
            <h2>Brand Details</h2>
            <BrandForm />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;