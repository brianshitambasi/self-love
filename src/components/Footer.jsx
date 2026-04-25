// components/Footer.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isChatbotPage = location.pathname === '/go-diamond';
  
  // Don't show footer on the chatbot page
  if (isChatbotPage) {
    return null;
  }
  
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Brand Column */}
          <div style={styles.column}>
            <div style={styles.brand}>
              <i className="fas fa-gem" style={styles.brandIcon}></i>
              <span style={styles.brandText}>Apex Legacy</span>
            </div>
            <p style={styles.description}>
              Empowering entrepreneurs to become next-gen CEOs through network marketing excellence.
            </p>
            <div style={styles.socialLinks}>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.socialIcon}
                className="social-icon"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.socialIcon}
                className="social-icon"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.socialIcon}
                className="social-icon"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.socialIcon}
                className="social-icon"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={styles.column}>
            <h4 style={styles.columnTitle}>Quick Links</h4>
            <ul style={styles.linkList}>
              <li><a href="/" style={styles.link}>Home</a></li>
              <li><a href="/about" style={styles.link}>About Me</a></li>
              <li><a href="/contact" style={styles.link}>Contact</a></li>
              <li><a href="/privacy" style={styles.link}>Privacy Policy</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div style={styles.column}>
            <h4 style={styles.columnTitle}>Programs</h4>
            <ul style={styles.linkList}>
              <li><a href="/diamond" style={styles.link}>Go Diamond Project</a></li>
              <li><a href="/webinar" style={styles.link}>Wealth Renaissance</a></li>
              <li><a href="/coffee" style={styles.link}>Success Coffee Session</a></li>
              <li><a href="/ecom" style={styles.link}>E-Com Business Builder</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div style={styles.column}>
            <h4 style={styles.columnTitle}>Connect With Me</h4>
            <ul style={styles.contactList}>
              <li><i className="fas fa-envelope"></i> hello@apexlegacy.com</li>
              <li><i className="fas fa-phone"></i> +1 (555) 789-0123</li>
              <li><i className="fas fa-map-marker-alt"></i> Global - Remote</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <p style={styles.copyright}>
            © 2025 Apex Legacy. All rights reserved. | Empowering entrepreneurs worldwide
          </p>
          <div style={styles.bottomLinks}>
            <a href="/cookies" style={styles.bottomLink} className="bottom-link">Cookie Preferences</a>
            <a href="/report" style={styles.bottomLink} className="bottom-link">Report</a>
            <a href="/privacy" style={styles.bottomLink} className="bottom-link">Privacy</a>
            <a href="/explore" style={styles.bottomLink} className="bottom-link">Explore</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: 'rgba(5, 7, 10, 0.95)',
    backdropFilter: 'blur(12px)',
    borderTop: '1px solid rgba(255, 215, 0, 0.15)',
    position: 'relative',
    zIndex: 2,
    marginTop: 'auto'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 2rem 1rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  brandIcon: {
    color: '#ffd700',
    fontSize: '1.8rem'
  },
  brandText: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  },
  description: {
    color: '#aaa',
    fontSize: '0.9rem',
    lineHeight: '1.5'
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem'
  },
  socialIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'rgba(255, 215, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffd700',
    transition: 'all 0.3s',
    textDecoration: 'none'
  },
  columnTitle: {
    color: '#ffd700',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  link: {
    color: '#aaa',
    textDecoration: 'none',
    fontSize: '0.9rem',
    lineHeight: '2',
    transition: 'color 0.3s'
  },
  contactList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  bottomBar: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  copyright: {
    color: '#666',
    fontSize: '0.8rem',
    margin: 0
  },
  bottomLinks: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap'
  },
  bottomLink: {
    color: '#666',
    textDecoration: 'none',
    fontSize: '0.8rem',
    transition: 'color 0.3s'
  }
};

// Add hover styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .social-icon:hover {
    background: #ffd700;
    color: #1a1a2e !important;
    transform: translateY(-3px);
  }
  .footer-link:hover {
    color: #ffd700 !important;
  }
  .bottom-link:hover {
    color: #ffd700 !important;
  }
  @media (max-width: 768px) {
    .bottom-bar {
      flex-direction: column;
      text-align: center;
    }
    .bottom-links {
      justify-content: center;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Footer;