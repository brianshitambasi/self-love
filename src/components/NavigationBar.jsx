// NavigationBar.jsx - Complete Optimized Version
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowSearch(false);
    setShowUserMenu(false);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync notification count from localStorage
  useEffect(() => {
    const count = localStorage.getItem('notificationCount');
    if (count) {
      setNotifications(parseInt(count));
    }
    
    const handleNotificationUpdate = (event) => {
      setNotifications(event.detail);
    };
    
    window.addEventListener('notificationUpdate', handleNotificationUpdate);
    return () => window.removeEventListener('notificationUpdate', handleNotificationUpdate);
  }, []);

  const handleGoDiamondClick = () => {
    navigate('/go-diamond');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setShowUserMenu(false);
    navigate('/');
    window.location.reload();
  };

  // Dropdown menu items
  const dropdownItems = [
    { title: 'Go Diamond Project', path: '/go-diamond', icon: 'fa-gem' },
    { title: 'Wealth Renaissance', path: '/webinar', icon: 'fa-chalkboard-user' },
    { title: 'Success Coffee', path: '/coffee', icon: 'fa-coffee' },
    { title: 'E-Com Business', path: '/ecom', icon: 'fa-cart-shopping' }
  ];

  // Quick links for search suggestions
  const searchSuggestions = [
    'Network marketing strategies',
    'Full stack development',
    'Financial freedom',
    'Go Diamond Project',
    'Coffee chat booking',
    'Wealth Renaissance webinar',
    'Success Coffee Session'
  ];

  // Inject styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .navbar {
        background: rgba(10, 12, 18, 0.95);
        backdrop-filter: blur(20px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        padding: 1rem 0;
        border-bottom: 1px solid rgba(255, 215, 0, 0.15);
      }

      .navbar-scrolled {
        padding: 0.5rem 0;
        background: rgba(10, 12, 18, 0.98);
        backdrop-filter: blur(25px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        border-bottom-color: rgba(255, 215, 0, 0.3);
      }

      .navbar-brand {
        margin-right: 2rem;
      }

      .logo-wrapper {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        position: relative;
      }

      .logo-icon {
        font-size: 1.8rem;
        color: #ffd700;
        filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
        animation: float 3s ease-in-out infinite;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3px); }
      }

      .logo-text {
        font-size: 1.3rem;
        font-weight: 800;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        letter-spacing: -0.5px;
      }

      .logo-text-glow {
        font-size: 1.3rem;
        font-weight: 800;
        background: linear-gradient(135deg, #FFA500, #FF6347);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
      }

      .navbar-nav {
        gap: 0.25rem;
        align-items: center;
      }

      .nav-item {
        position: relative;
      }

      .nav-link {
        color: rgba(255, 255, 255, 0.85) !important;
        font-weight: 500;
        padding: 0.5rem 1rem !important;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border-radius: 10px;
        position: relative;
        font-size: 0.9rem;
      }

      .nav-link i {
        font-size: 1rem;
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
      }

      /* Dropdown Menu */
      .dropdown-menu-custom {
        position: absolute;
        top: 100%;
        left: 0;
        background: rgba(10, 12, 18, 0.98);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 215, 0, 0.2);
        border-radius: 12px;
        padding: 0.5rem;
        min-width: 220px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        z-index: 1000;
      }

      .nav-item.dropdown:hover .dropdown-menu-custom {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .dropdown-item-custom {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.6rem 1rem;
        color: #fff;
        text-decoration: none;
        border-radius: 10px;
        transition: all 0.3s ease;
        font-size: 0.85rem;
      }

      .dropdown-item-custom:hover {
        background: rgba(255, 215, 0, 0.1);
        color: #ffd700;
        transform: translateX(5px);
      }

      /* Search Bar */
      .search-container {
        position: relative;
      }

      .search-input {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 215, 0, 0.2);
        border-radius: 40px;
        padding: 0.4rem 1rem 0.4rem 2.2rem;
        color: #fff;
        width: 180px;
        transition: all 0.3s ease;
        font-size: 0.85rem;
      }

      .search-input:focus {
        outline: none;
        border-color: #ffd700;
        width: 220px;
        background: rgba(255, 255, 255, 0.12);
      }

      .search-icon {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #ffd700;
        font-size: 0.8rem;
      }

      /* Notification Badge */
      .notification-badge {
        position: absolute;
        top: -2px;
        right: -2px;
        background: #ff6347;
        color: white;
        font-size: 9px;
        border-radius: 50%;
        padding: 2px 5px;
        min-width: 16px;
        text-align: center;
      }

      /* User Menu */
      .user-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background: rgba(10, 12, 18, 0.98);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 215, 0, 0.2);
        border-radius: 12px;
        padding: 0.5rem;
        min-width: 200px;
        z-index: 1000;
      }

      .user-menu-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.6rem 1rem;
        color: #fff;
        text-decoration: none;
        border-radius: 10px;
        transition: all 0.3s ease;
        cursor: pointer;
        font-size: 0.85rem;
      }

      .user-menu-item:hover {
        background: rgba(255, 215, 0, 0.1);
        color: #ffd700;
      }

      .btn-diamond {
        background: linear-gradient(135deg, #ffd700, #ff8c00, #ff6347);
        border: none;
        border-radius: 40px;
        padding: 0.5rem 1.2rem;
        color: #1a1a2e;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        position: relative;
        overflow: hidden;
        font-size: 0.85rem;
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
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
        gap: 0.7rem;
      }

      .btn-diamond:hover::before {
        width: 200px;
        height: 200px;
      }

      .custom-toggler {
        border-color: rgba(255, 215, 0, 0.5) !important;
        padding: 0.4rem !important;
      }

      .custom-toggler:focus {
        box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.3) !important;
      }

      .progress-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: transparent;
        z-index: 1001;
      }

      .progress-bar-custom {
        height: 100%;
        background: linear-gradient(90deg, #ffd700, #ff6347);
        width: 0%;
        transition: width 0.3s ease;
        box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
      }

      /* Desktop Layout Optimization */
      @media (min-width: 1200px) {
        .container {
          max-width: 95%;
          padding: 0 1rem;
        }
        
        .navbar-nav {
          gap: 0.5rem;
        }
        
        .nav-link {
          padding: 0.5rem 1rem !important;
          font-size: 0.9rem;
        }
        
        .search-input {
          width: 200px;
        }
        
        .search-input:focus {
          width: 250px;
        }
      }

      /* Tablet Layout */
      @media (max-width: 1199px) and (min-width: 992px) {
        .nav-link span {
          display: none;
        }
        
        .nav-link i {
          font-size: 1.2rem;
        }
        
        .nav-link {
          padding: 0.5rem 0.8rem !important;
        }
        
        .btn-diamond span {
          display: none;
        }
        
        .btn-diamond {
          padding: 0.5rem;
        }
      }

      /* Mobile Layout */
      @media (max-width: 991px) {
        .navbar-collapse {
          background: rgba(10, 12, 18, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 1rem;
          margin-top: 1rem;
          border: 1px solid rgba(255, 215, 0, 0.2);
          max-height: 80vh;
          overflow-y: auto;
        }

        .navbar-nav {
          gap: 0.5rem;
        }

        .nav-link {
          justify-content: flex-start;
          padding: 0.7rem 1rem !important;
        }
        
        .nav-link span {
          display: inline;
        }

        .btn-diamond {
          width: 100%;
          justify-content: center;
          margin-top: 0.5rem;
          padding: 0.7rem;
        }
        
        .btn-diamond span {
          display: inline;
        }

        .search-input {
          width: 100%;
        }
        
        .dropdown-menu-custom {
          position: static;
          opacity: 1;
          visibility: visible;
          transform: none;
          margin-top: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
        }
        
        .nav-item.dropdown:hover .dropdown-menu-custom {
          transform: none;
        }
      }

      @media (max-width: 768px) {
        .logo-text, .logo-text-glow {
          font-size: 1rem;
        }
        
        .logo-icon {
          font-size: 1.3rem;
        }
        
        .navbar {
          padding: 0.7rem 0;
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

          {/* Mobile Action Buttons */}
          <div className="d-flex align-items-center gap-2 d-lg-none">
            <button 
              className="btn btn-link text-warning p-2"
              onClick={() => setShowSearch(!showSearch)}
            >
              <i className="fas fa-search"></i>
            </button>
            <button 
              className="btn btn-link text-warning p-2 position-relative"
              onClick={() => navigate('/notifications')}
            >
              <i className="fas fa-bell"></i>
              {notifications > 0 && (
                <span className="notification-badge" style={{ top: '0px', right: '0px' }}>{notifications}</span>
              )}
            </button>
            <button 
              className="navbar-toggler custom-toggler" 
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* Home Link */}
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                  <i className="fas fa-home"></i>
                  <span>Home</span>
                </Link>
              </li>

              {/* Programs Dropdown */}
              <li className="nav-item dropdown">
                <Link className="nav-link" to="#" role="button">
                  <i className="fas fa-gem"></i>
                  <span>Programs</span>
                  <i className="fas fa-chevron-down ms-1" style={{ fontSize: '0.7rem' }}></i>
                </Link>
                <div className="dropdown-menu-custom">
                  {dropdownItems.map((item, idx) => (
                    <Link key={idx} to={item.path} className="dropdown-item-custom">
                      <i className={`fas ${item.icon}`} style={{ width: '20px' }}></i>
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </li>

              {/* About Link */}
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">
                  <i className="fas fa-user-astronaut"></i>
                  <span>About</span>
                </Link>
              </li>

              {/* Contact Link */}
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">
                  <i className="fas fa-paper-plane"></i>
                  <span>Contact</span>
                </Link>
              </li>

              {/* Desktop Search Bar */}
              <li className="nav-item d-none d-lg-block">
                <div className="search-container" ref={searchRef}>
                  <form onSubmit={handleSearch}>
                    <i className="fas fa-search search-icon"></i>
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setShowSearch(true)}
                    />
                  </form>
                  {showSearch && searchQuery && (
                    <div className="user-menu" style={{ top: '100%', left: 0, right: 'auto', width: '250px' }}>
                      {searchSuggestions
                        .filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
                        .slice(0, 5)
                        .map((suggestion, idx) => (
                          <div
                            key={idx}
                            className="user-menu-item"
                            onClick={() => {
                              setSearchQuery(suggestion);
                              navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                              setShowSearch(false);
                            }}
                          >
                            <i className="fas fa-search"></i>
                            <span>{suggestion}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </li>

              {/* Desktop Notification Bell */}
              <li className="nav-item position-relative d-none d-lg-block">
                <button className="nav-link" onClick={() => navigate('/notifications')}>
                  <i className="fas fa-bell"></i>
                  {notifications > 0 && (
                    <span className="notification-badge">{notifications}</span>
                  )}
                </button>
              </li>

              {/* User Menu */}
              <li className="nav-item position-relative" ref={userMenuRef}>
                <button 
                  className="nav-link"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <i className="fas fa-user-circle"></i>
                  <span>Account</span>
                  <i className="fas fa-chevron-down ms-1" style={{ fontSize: '0.7rem' }}></i>
                </button>
                {showUserMenu && (
                  <div className="user-menu">
                    {isLoggedIn ? (
                      <>
                        <Link to="/profile" className="user-menu-item" onClick={() => setShowUserMenu(false)}>
                          <i className="fas fa-user"></i>
                          <span>My Profile</span>
                        </Link>
                        <Link to="/dashboard" className="user-menu-item" onClick={() => setShowUserMenu(false)}>
                          <i className="fas fa-tachometer-alt"></i>
                          <span>Dashboard</span>
                        </Link>
                        <Link to="/bookings" className="user-menu-item" onClick={() => setShowUserMenu(false)}>
                          <i className="fas fa-calendar-check"></i>
                          <span>My Bookings</span>
                        </Link>
                        <hr style={{ margin: '0.4rem 0', borderColor: 'rgba(255,215,0,0.2)' }} />
                        <div className="user-menu-item" onClick={handleLogout}>
                          <i className="fas fa-sign-out-alt"></i>
                          <span>Sign Out</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="user-menu-item" onClick={() => setShowUserMenu(false)}>
                          <i className="fas fa-sign-in-alt"></i>
                          <span>Sign In</span>
                        </Link>
                        <Link to="/login" className="user-menu-item" onClick={() => setShowUserMenu(false)}>
                          <i className="fas fa-user-plus"></i>
                          <span>Create Account</span>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </li>

              {/* Go Diamond Button */}
              <li className="nav-item">
                <button 
                  className="btn-diamond ms-lg-2"
                  onClick={handleGoDiamondClick}
                >
                  <i className="fas fa-gem"></i>
                  <span>Go Diamond</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="d-lg-none p-3" style={{ background: 'rgba(10,12,18,0.98)', borderTop: '1px solid rgba(255,215,0,0.2)' }}>
            <form onSubmit={handleSearch}>
              <div className="position-relative">
                <i className="fas fa-search position-absolute" style={{ left: '15px', top: '13px', color: '#ffd700' }}></i>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '40px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,215,0,0.2)', color: '#fff' }}
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </nav>

      <div className="progress-container">
        <div className="progress-bar-custom" id="progressBar"></div>
      </div>
    </>
  );
};

export default NavigationBar;