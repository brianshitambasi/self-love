import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScrollProgress = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledPercent = (winScroll / height) * 100;
      const progressBar = document.getElementById('progressBar');
      if (progressBar) {
        progressBar.style.width = scrolledPercent + '%';
      }
    };
    
    window.addEventListener('scroll', handleScrollProgress);
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  // Inject styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
      
      .navbar {
        background: rgba(10, 12, 18, 0.85);
        backdrop-filter: blur(20px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        padding: 1rem 0;
        border-bottom: 1px solid rgba(255, 215, 0, 0.1);
      }

      .navbar-scrolled {
        padding: 0.7rem 0;
        background: rgba(10, 12, 18, 0.95);
        backdrop-filter: blur(25px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        border-bottom-color: rgba(255, 215, 0, 0.3);
      }

      .logo-wrapper {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        position: relative;
      }

      .logo-icon {
        font-size: 2rem;
        color: #ffd700;
        filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
        animation: float 3s ease-in-out infinite;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3px); }
      }

      .logo-text {
        font-size: 1.5rem;
        font-weight: 800;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        letter-spacing: -0.5px;
      }

      .logo-text-glow {
        font-size: 1.5rem;
        font-weight: 800;
        background: linear-gradient(135deg, #FFA500, #FF6347);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
      }

      .navbar-nav {
        gap: 0.5rem;
        align-items: center;
      }

      .nav-item {
        position: relative;
      }

      .nav-link {
        color: rgba(255, 255, 255, 0.85) !important;
        font-weight: 500;
        padding: 0.7rem 1.2rem !important;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.6rem;
        border-radius: 12px;
        position: relative;
        overflow: hidden;
      }

      .nav-link i {
        font-size: 1.1rem;
        transition: transform 0.3s ease;
      }

      .nav-link:hover {
        color: #ffd700 !important;
        background: rgba(255, 215, 0, 0.1);
        transform: translateY(-2px);
      }

      .nav-link:hover i {
        transform: scale(1.1);
      }

      .nav-link.active {
        color: #ffd700 !important;
        background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 165, 0, 0.1));
        border-bottom: 2px solid #ffd700;
      }

      .nav-link.active::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at center, rgba(255, 215, 0, 0.1), transparent);
        pointer-events: none;
      }

      .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #ffd700, #ff6347);
        transition: all 0.3s ease;
        transform: translateX(-50%);
      }

      .nav-link:hover::after {
        width: 80%;
      }

      .btn-diamond {
        background: linear-gradient(135deg, #ffd700, #ff8c00, #ff6347);
        border: none;
        border-radius: 50px;
        padding: 0.7rem 1.8rem;
        color: #1a1a2e;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 0.7rem;
        position: relative;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(255, 215, 0, 0.2);
      }

      .btn-diamond::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }

      .btn-diamond:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
        gap: 1rem;
      }

      .btn-diamond:hover::before {
        width: 300px;
        height: 300px;
      }

      .btn-diamond i {
        font-size: 1.1rem;
        transition: transform 0.3s ease;
      }

      .btn-diamond:hover i:first-child {
        transform: rotate(15deg) scale(1.1);
      }

      .btn-diamond:hover i:last-child {
        transform: translateX(5px);
      }

      .custom-toggler {
        border-color: rgba(255, 215, 0, 0.5) !important;
        padding: 0.5rem !important;
      }

      .custom-toggler:focus {
        box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3) !important;
      }

      .navbar-toggler-icon {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 215, 0, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
      }

      .progress-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: transparent;
        z-index: 1001;
      }

      .progress-bar-custom {
        height: 100%;
        background: linear-gradient(90deg, #ffd700, #ff6347);
        width: 0%;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
      }

      @media (max-width: 991px) {
        .navbar-collapse {
          background: rgba(10, 12, 18, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 1.5rem;
          margin-top: 1rem;
          border: 1px solid rgba(255, 215, 0, 0.2);
        }

        .navbar-nav {
          gap: 0.8rem;
        }

        .nav-link {
          justify-content: center;
          padding: 0.8rem !important;
        }

        .btn-diamond {
          width: 100%;
          justify-content: center;
          margin-top: 0.5rem;
        }
      }

      @media (max-width: 768px) {
        .logo-text, .logo-text-glow {
          font-size: 1.2rem;
        }
        
        .logo-icon {
          font-size: 1.5rem;
        }
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-100%);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .navbar {
        animation: slideDown 0.5s ease;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <>
      <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div className="logo-wrapper">
              <i className="fas fa-crown logo-icon"></i>
              <span className="logo-text">Apex</span>
              <span className="logo-text-glow">Legacy</span>
            </div>
          </Link>

          <button 
            className="navbar-toggler custom-toggler" 
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                  <i className="fas fa-home"></i>
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">
                  <i className="fas fa-user-astronaut"></i>
                  <span>About</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">
                  <i className="fas fa-paper-plane"></i>
                  <span>Contact</span>
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn-diamond ms-lg-3">
                  <i className="fas fa-gem"></i>
                  <span>Go Diamond</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="progress-container">
        <div className="progress-bar-custom" id="progressBar"></div>
      </div>
    </>
  );
};

export default NavigationBar;