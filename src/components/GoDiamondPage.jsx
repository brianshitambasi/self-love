// src/components/GoDiamondPage.jsx
import React from 'react';
import GoDiamond from './GoDiamond';

const GoDiamondPage = () => {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.iconContainer}>
            <i className="fas fa-gem" style={styles.gemIcon}></i>
          </div>
          <h1 style={styles.title}>
            <span style={styles.titleGold}>Go</span>
            <span style={styles.titleOrange}>Diamond</span>
          </h1>
          <p style={styles.subtitle}>
            Your Personal AI Assistant for Network Marketing Success
          </p>
          <p style={styles.description}>
            Ask me anything about building wealth, network marketing, web development, or financial freedom!
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div style={styles.chatWrapper}>
        <div style={styles.chatContainer}>
          <GoDiamond />
        </div>
      </div>

      {/* Features */}
      <div style={styles.features}>
        <div style={styles.feature}>
          <i className="fas fa-robot" style={styles.featureIcon}></i>
          <span>24/7 AI Support</span>
        </div>
        <div style={styles.feature}>
          <i className="fas fa-bolt" style={styles.featureIcon}></i>
          <span>Instant Answers</span>
        </div>
        <div style={styles.feature}>
          <i className="fas fa-gem" style={styles.featureIcon}></i>
          <span>Diamond Mentorship</span>
        </div>
        <div style={styles.feature}>
          <i className="fas fa-chart-line" style={styles.featureIcon}></i>
          <span>Proven Strategies</span>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0c12 0%, #1a1a2e 50%, #0f0f23 100%)',
    paddingTop: '80px',
    paddingBottom: '2rem'
  },
  hero: {
    textAlign: 'center',
    padding: '2rem 1rem',
    position: 'relative'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  iconContainer: {
    marginBottom: '1.5rem'
  },
  gemIcon: {
    fontSize: '4rem',
    color: '#ffd700',
    animation: 'float 3s ease-in-out infinite',
    filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))'
  },
  title: {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: '800',
    marginBottom: '1rem'
  },
  titleGold: {
    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  },
  titleOrange: {
    background: 'linear-gradient(135deg, #FFA500, #FF6347)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  },
  subtitle: {
    fontSize: '1.3rem',
    color: '#ffd700',
    marginBottom: '0.5rem'
  },
  description: {
    fontSize: '1rem',
    color: '#aaa',
    maxWidth: '600px',
    margin: '0 auto'
  },
  chatWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    marginTop: '1rem'
  },
  chatContainer: {
    width: '100%',
    maxWidth: '900px',
    height: '550px',
    background: 'rgba(26, 26, 46, 0.6)',
    borderRadius: '24px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,215,0,0.2)',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
  },
  features: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '3rem',
    flexWrap: 'wrap',
    padding: '0 1rem'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'rgba(255,215,0,0.1)',
    padding: '0.75rem 1.5rem',
    borderRadius: '50px',
    border: '1px solid rgba(255,215,0,0.2)',
    color: '#ffd700',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s'
  },
  featureIcon: {
    fontSize: '1.1rem'
  }
};

// Add hover effect for features
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .feature:hover {
    transform: translateY(-3px);
    background: rgba(255,215,0,0.2);
    border-color: rgba(255,215,0,0.5);
  }
`;
document.head.appendChild(styleSheet);

export default GoDiamondPage;