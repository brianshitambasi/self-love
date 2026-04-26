// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomeComponent from './components/HomeComponent';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GoDiamondPage from './components/GoDiamondPage';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Bookings from './components/Bookings';
import SignIn from './components/SignIn';
import Notifications from './components/Notifications';
import AdminNotifications from './components/AdminNotifications';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated, getUserRole, ROLES } from './utils/auth';
import './App.css';

function App() {
  // Check if user is logged in
  const isLoggedIn = isAuthenticated();
  const userRole = getUserRole();

  useEffect(() => {
    const handleDropdownClick = (e) => {
      const header = e.target.closest('.dropdown-mobile-header');
      if (header) {
        const content = header.nextElementSibling;
        const allContents = document.querySelectorAll('.dropdown-mobile-content');
        allContents.forEach(c => {
          if (c !== content) {
            c.classList.remove('show');
          }
        });
        content.classList.toggle('show');
        header.classList.toggle('active');
      }
    };

    document.addEventListener('click', handleDropdownClick);
    
    return () => {
      document.removeEventListener('click', handleDropdownClick);
    };
  }, []);

  // Protected route wrapper
  const ProtectedRouteComponent = ({ children, requiredRole = null }) => {
    if (!isLoggedIn) {
      window.location.href = '/login';
      return null;
    }
    
    if (requiredRole && userRole !== requiredRole && userRole !== ROLES.ADMIN) {
      window.location.href = '/dashboard';
      return null;
    }
    
    return children;
  };

  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          {/* Main Routes - Public */}
          <Route path="/" element={<HomeComponent />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/go-diamond" element={<GoDiamondPage />} />
          
          {/* User Account Routes - Protected */}
          <Route path="/profile" element={
            <ProtectedRouteComponent>
              <Profile />
            </ProtectedRouteComponent>
          } />
          <Route path="/dashboard" element={
            <ProtectedRouteComponent>
              <Dashboard />
            </ProtectedRouteComponent>
          } />
          <Route path="/bookings" element={
            <ProtectedRouteComponent>
              <Bookings />
            </ProtectedRouteComponent>
          } />
          <Route path="/notifications" element={
            <ProtectedRouteComponent>
              <Notifications />
            </ProtectedRouteComponent>
          } />
          
          {/* Admin Only Routes */}
          <Route path="/admin/bookings" element={
            <ProtectedRouteComponent requiredRole={ROLES.ADMIN}>
              <AdminNotifications />
            </ProtectedRouteComponent>
          } />
          
          {/* Auth Routes */}
          <Route path="/login" element={<SignIn />} />
          
          {/* Program Routes */}
          <Route path="/diamond" element={<GoDiamondPage />} />
          <Route path="/webinar" element={<HomeComponent />} />
          <Route path="/coffee" element={<HomeComponent />} />
          <Route path="/ecom" element={<HomeComponent />} />
          
          {/* Search Route */}
          <Route path="/search" element={<HomeComponent />} />
          
          {/* Legal Routes */}
          <Route path="/privacy" element={<HomeComponent />} />
          <Route path="/terms" element={<HomeComponent />} />
          <Route path="/cookies" element={<HomeComponent />} />
          <Route path="/report" element={<HomeComponent />} />
          <Route path="/explore" element={<HomeComponent />} />
          
          {/* 404 Catch-all Route */}
          <Route path="*" element={
            <div style={{ 
              minHeight: '100vh', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #05070a 0%, #0a0f1a 100%)',
              paddingTop: '80px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <i className="fas fa-gem fa-4x" style={{ color: '#ffd700', marginBottom: '1rem' }}></i>
                <h1 style={{ color: '#fff', fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
                <h2 style={{ color: '#ffd700', marginBottom: '1rem' }}>Page Not Found</h2>
                <p style={{ color: '#aaa', marginBottom: '2rem' }}>The page you're looking for doesn't exist or has been moved.</p>
                <button 
                  onClick={() => window.location.href = '/'}
                  style={{
                    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
                    border: 'none',
                    borderRadius: '40px',
                    padding: '12px 32px',
                    color: '#1a1a2e',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <i className="fas fa-home me-2"></i> Back to Home
                </button>
              </div>
            </div>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;