// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomeComponent from './components/HomeComponent';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Add mobile dropdown functionality
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

  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;