// src/components/GoDiamondPage.jsx - Enhanced with more features
import React, { useState, useEffect } from 'react';
import GoDiamond from './GoDiamond';

const GoDiamondPage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const rotatingPhrases = [
    'Network Marketing Success',
    'Full Stack Development',
    'Financial Freedom',
    'Business Growth',
    'Tech Skills + MLM'
  ];

  useEffect(() => {
    // Typing animation for rotating text
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Typing effect
    let currentIndex = 0;
    const currentPhrase = rotatingPhrases[textIndex];
    const typingInterval = setInterval(() => {
      if (currentIndex <= currentPhrase.length) {
        setTypingText(currentPhrase.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [textIndex]);

  useEffect(() => {
    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resources = [
    { title: 'MLM Success Guide', icon: 'fa-book', type: 'pdf', link: '#' },
    { title: 'Code to Cash Webinar', icon: 'fa-video', type: 'video', link: '#' },
    { title: 'Network Marketing Checklist', icon: 'fa-check-circle', type: 'pdf', link: '#' },
    { title: 'Success Stories eBook', icon: 'fa-chart-line', type: 'ebook', link: '#' }
  ];

  const successStats = [
    { number: '10,000+', label: 'Active Users', icon: 'fa-users' },
    { number: '150+', label: 'Countries', icon: 'fa-globe' },
    { number: '98%', label: 'Satisfaction Rate', icon: 'fa-smile' },
    { number: '24/7', label: 'AI Support', icon: 'fa-clock' }
  ];

  const testimonials = [
    { name: 'John M.', role: 'Diamond Leader', text: 'BrianBot helped me understand the compensation plan and build my team faster than ever!', rating: 5 },
    { name: 'Sarah K.', role: 'Team Builder', text: 'The AI assistant answered all my questions about network marketing. Game changer!', rating: 5 },
    { name: 'David L.', role: 'Software Engineer', text: 'As a developer, I loved how BrianBot explains combining tech skills with MLM.', rating: 5 }
  ];

  const faqs = [
    { q: 'Is BrianBot free to use?', a: 'Yes! BrianBot is completely free for all visitors. Chat anytime about network marketing, coding, or financial freedom.' },
    { q: 'Can I schedule a personal call?', a: 'Absolutely! Click the "Schedule Coffee Chat" button on the homepage to book a free session with Brian.' },
    { q: 'How accurate is the AI?', a: 'BrianBot is trained on Brian\'s personal knowledge and experience in network marketing and web development.' }
  ];

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.bgAnimation}>
        <div style={styles.bgCircle1}></div>
        <div style={styles.bgCircle2}></div>
        <div style={styles.bgCircle3}></div>
      </div>

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.iconContainer}>
            <div style={styles.pulseRing}></div>
            <i className="fas fa-gem" style={styles.gemIcon}></i>
          </div>
          <h1 style={styles.title}>
            <span style={styles.titleGold}>Go</span>
            <span style={styles.titleOrange}>Diamond</span>
          </h1>
          <div style={styles.typingContainer}>
            <span style={styles.typingPrefix}>Your AI Assistant for </span>
            <span style={styles.typingText}>{typingText}</span>
            <span style={styles.cursor}>|</span>
          </div>
          <p style={styles.description}>
            Ask me anything about building wealth, network marketing, web development, or financial freedom!
          </p>
          
          {/* Quick Action Buttons */}
          <div style={styles.quickActions}>
            <button style={styles.quickActionBtn} onClick={() => window.location.href = '/'}>
              <i className="fas fa-coffee"></i> Schedule Coffee Chat
            </button>
            <button style={styles.quickActionBtnSecondary} onClick={() => setShowDemoModal(true)}>
              <i className="fas fa-play-circle"></i> Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsSection}>
        <div style={styles.statsContainer}>
          {successStats.map((stat, idx) => (
            <div key={idx} style={styles.statCard} data-aos="fade-up" data-aos-delay={idx * 100}>
              <i className={`fas ${stat.icon}`} style={styles.statIcon}></i>
              <h3 style={styles.statNumber}>{stat.number}</h3>
              <p style={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div style={styles.chatWrapper}>
        <div style={styles.chatCard}>
          <div style={styles.chatHeader}>
            <div style={styles.chatStatus}>
              <span style={styles.statusDot}></span>
              <span>BrianBot AI Assistant</span>
            </div>
            <div style={styles.chatActions}>
              <button style={styles.chatActionBtn} onClick={() => alert('Chat history cleared')}>
                <i className="fas fa-trash-alt"></i>
              </button>
              <button style={styles.chatActionBtn} onClick={() => window.location.reload()}>
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
          </div>
          <div style={styles.chatContainer}>
            <GoDiamond />
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div style={styles.resourcesSection}>
        <h2 style={styles.sectionTitle}>
          <i className="fas fa-gem" style={styles.sectionIcon}></i>
          Free Resources
        </h2>
        <p style={styles.sectionSubtitle}>Download these free guides to accelerate your journey</p>
        <div style={styles.resourcesGrid}>
          {resources.map((resource, idx) => (
            <div key={idx} style={styles.resourceCard} onClick={() => setSelectedResource(resource)}>
              <div style={styles.resourceIcon}>
                <i className={`fas ${resource.icon}`}></i>
              </div>
              <h4 style={styles.resourceTitle}>{resource.title}</h4>
              <span style={styles.resourceType}>{resource.type.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={styles.testimonialsSection}>
        <h2 style={styles.sectionTitle}>
          <i className="fas fa-star" style={styles.sectionIcon}></i>
          What Users Say
        </h2>
        <div style={styles.testimonialsGrid}>
          {testimonials.map((testimonial, idx) => (
            <div key={idx} style={styles.testimonialCard}>
              <div style={styles.ratingStars}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star" style={styles.starIcon}></i>
                ))}
              </div>
              <p style={styles.testimonialText}>"{testimonial.text}"</p>
              <h4 style={styles.testimonialName}>{testimonial.name}</h4>
              <p style={styles.testimonialRole}>{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div style={styles.faqSection}>
        <h2 style={styles.sectionTitle}>
          <i className="fas fa-question-circle" style={styles.sectionIcon}></i>
          Frequently Asked Questions
        </h2>
        <div style={styles.faqGrid}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={styles.faqCard}>
              <h4 style={styles.faqQuestion}>{faq.q}</h4>
              <p style={styles.faqAnswer}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={styles.features}>
        <div style={styles.feature}>
          <i className="fas fa-robot" style={styles.featureIcon}></i>
          <div>
            <h4>24/7 AI Support</h4>
            <span>Always available to answer your questions</span>
          </div>
        </div>
        <div style={styles.feature}>
          <i className="fas fa-bolt" style={styles.featureIcon}></i>
          <div>
            <h4>Instant Answers</h4>
            <span>Get responses in seconds</span>
          </div>
        </div>
        <div style={styles.feature}>
          <i className="fas fa-gem" style={styles.featureIcon}></i>
          <div>
            <h4>Diamond Mentorship</h4>
            <span>Learn from Brian's experience</span>
          </div>
        </div>
        <div style={styles.feature}>
          <i className="fas fa-chart-line" style={styles.featureIcon}></i>
          <div>
            <h4>Proven Strategies</h4>
            <span>Methods that actually work</span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Transform Your Life?</h2>
          <p style={styles.ctaText}>Join thousands of successful entrepreneurs using BrianBot to achieve their goals</p>
          <button style={styles.ctaButton} onClick={() => window.location.href = '/login'}>
            Get Started Today <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button style={styles.scrollTopBtn} onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i>
        </button>
      )}

      {/* Demo Modal */}
      {showDemoModal && (
        <div style={styles.modalOverlay} onClick={() => setShowDemoModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setShowDemoModal(false)}>×</button>
            <h3 style={styles.modalTitle}>How BrianBot Works</h3>
            <div style={styles.modalVideo}>
              <i className="fas fa-play-circle" style={styles.modalVideoIcon}></i>
              <p>Demo video coming soon. In the meantime, start chatting with BrianBot below!</p>
            </div>
            <button style={styles.modalButton} onClick={() => setShowDemoModal(false)}>Start Chatting</button>
          </div>
        </div>
      )}

      {/* Resource Modal */}
      {selectedResource && (
        <div style={styles.modalOverlay} onClick={() => setSelectedResource(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setSelectedResource(null)}>×</button>
            <div style={styles.modalResourceIcon}>
              <i className={`fas ${selectedResource.icon}`}></i>
            </div>
            <h3 style={styles.modalTitle}>{selectedResource.title}</h3>
            <p style={styles.modalText}>This resource is available for free. Click the button below to download.</p>
            <button style={styles.modalButton} onClick={() => { alert('Resource download started!'); setSelectedResource(null); }}>
              Download Now <i className="fas fa-download"></i>
            </button>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.05); }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
            }
          }
          * {
            scroll-behavior: smooth;
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
    paddingBottom: '2rem',
    position: 'relative',
    overflowX: 'hidden'
  },
  bgAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 0
  },
  bgCircle1: {
    position: 'absolute',
    top: '10%',
    left: '-10%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'pulse 8s ease-in-out infinite'
  },
  bgCircle2: {
    position: 'absolute',
    bottom: '10%',
    right: '-10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(255,100,50,0.06) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'pulse 10s ease-in-out infinite reverse'
  },
  bgCircle3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(255,215,0,0.04) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    animation: 'pulse 12s ease-in-out infinite'
  },
  hero: {
    textAlign: 'center',
    padding: '2rem 1rem',
    position: 'relative',
    zIndex: 2
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  iconContainer: {
    marginBottom: '1.5rem',
    position: 'relative',
    display: 'inline-block'
  },
  pulseRing: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100px',
    height: '100px',
    background: 'rgba(255,215,0,0.2)',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    animation: 'pulse 2s ease-in-out infinite'
  },
  gemIcon: {
    fontSize: '4rem',
    color: '#ffd700',
    animation: 'float 3s ease-in-out infinite',
    filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))',
    position: 'relative',
    zIndex: 1
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
  typingContainer: {
    fontSize: '1.3rem',
    marginBottom: '1rem',
    minHeight: '3rem'
  },
  typingPrefix: {
    color: '#aaa'
  },
  typingText: {
    color: '#ffd700',
    fontWeight: 'bold'
  },
  cursor: {
    color: '#ffd700',
    animation: 'blink 1s infinite',
    marginLeft: '2px'
  },
  description: {
    fontSize: '1rem',
    color: '#aaa',
    maxWidth: '600px',
    margin: '0 auto 1.5rem'
  },
  quickActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  quickActionBtn: {
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    border: 'none',
    borderRadius: '40px',
    padding: '10px 24px',
    color: '#1a1a2e',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  quickActionBtnSecondary: {
    background: 'transparent',
    border: '2px solid #ffd700',
    borderRadius: '40px',
    padding: '10px 24px',
    color: '#ffd700',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  statsSection: {
    padding: '3rem 1rem',
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    margin: '0 auto'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    textAlign: 'center'
  },
  statCard: {
    background: 'rgba(255,215,0,0.05)',
    borderRadius: '20px',
    padding: '1.5rem',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,215,0,0.1)',
    transition: 'all 0.3s'
  },
  statIcon: {
    fontSize: '2rem',
    color: '#ffd700',
    marginBottom: '0.5rem'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: '0.25rem'
  },
  statLabel: {
    color: '#aaa',
    fontSize: '0.9rem'
  },
  chatWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    marginTop: '1rem',
    position: 'relative',
    zIndex: 2
  },
  chatCard: {
    width: '100%',
    maxWidth: '900px',
    background: 'rgba(26, 26, 46, 0.8)',
    borderRadius: '24px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,215,0,0.2)',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
    transition: 'all 0.3s'
  },
  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    background: 'rgba(0,0,0,0.3)',
    borderBottom: '1px solid rgba(255,215,0,0.1)'
  },
  chatStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#fff'
  },
  statusDot: {
    width: '10px',
    height: '10px',
    background: '#4caf50',
    borderRadius: '50%',
    animation: 'pulse 2s infinite'
  },
  chatActions: {
    display: 'flex',
    gap: '0.5rem'
  },
  chatActionBtn: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 10px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  chatContainer: {
    width: '100%',
    height: '550px',
    overflow: 'hidden'
  },
  resourcesSection: {
    padding: '3rem 1rem',
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    margin: '0 auto'
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: '0.5rem'
  },
  sectionIcon: {
    marginRight: '0.5rem'
  },
  sectionSubtitle: {
    textAlign: 'center',
    color: '#aaa',
    marginBottom: '2rem'
  },
  resourcesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem'
  },
  resourceCard: {
    background: 'rgba(255,215,0,0.05)',
    borderRadius: '16px',
    padding: '1.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
    border: '1px solid rgba(255,215,0,0.1)'
  },
  resourceIcon: {
    fontSize: '2rem',
    color: '#ffd700',
    marginBottom: '1rem'
  },
  resourceTitle: {
    color: '#fff',
    marginBottom: '0.5rem'
  },
  resourceType: {
    fontSize: '0.7rem',
    color: '#ffd700',
    background: 'rgba(255,215,0,0.2)',
    padding: '2px 8px',
    borderRadius: '12px'
  },
  testimonialsSection: {
    padding: '3rem 1rem',
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    margin: '0 auto'
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  testimonialCard: {
    background: 'rgba(255,215,0,0.05)',
    borderRadius: '16px',
    padding: '1.5rem',
    textAlign: 'center',
    border: '1px solid rgba(255,215,0,0.1)'
  },
  ratingStars: {
    marginBottom: '0.5rem'
  },
  starIcon: {
    color: '#ffd700',
    fontSize: '0.9rem',
    margin: '0 1px'
  },
  testimonialText: {
    color: '#ccc',
    fontStyle: 'italic',
    marginBottom: '1rem',
    lineHeight: '1.6'
  },
  testimonialName: {
    color: '#ffd700',
    marginBottom: '0.25rem'
  },
  testimonialRole: {
    color: '#aaa',
    fontSize: '0.8rem'
  },
  faqSection: {
    padding: '3rem 1rem',
    position: 'relative',
    zIndex: 2,
    maxWidth: '900px',
    margin: '0 auto'
  },
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem'
  },
  faqCard: {
    background: 'rgba(255,215,0,0.05)',
    borderRadius: '12px',
    padding: '1.2rem',
    border: '1px solid rgba(255,215,0,0.1)'
  },
  faqQuestion: {
    color: '#ffd700',
    marginBottom: '0.5rem',
    fontSize: '1rem'
  },
  faqAnswer: {
    color: '#aaa',
    fontSize: '0.9rem',
    lineHeight: '1.5'
  },
  features: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '3rem',
    flexWrap: 'wrap',
    padding: '0 1rem',
    position: 'relative',
    zIndex: 2,
    maxWidth: '1000px',
    margin: '3rem auto 0'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'rgba(255,215,0,0.1)',
    padding: '1rem 1.5rem',
    borderRadius: '50px',
    border: '1px solid rgba(255,215,0,0.2)',
    color: '#ffd700',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s',
    flex: '1',
    minWidth: '200px'
  },
  featureIcon: {
    fontSize: '1.3rem'
  },
  ctaSection: {
    marginTop: '4rem',
    padding: '3rem 1rem',
    position: 'relative',
    zIndex: 2,
    background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,100,50,0.05))',
    borderRadius: '24px',
    maxWidth: '800px',
    margin: '3rem auto 0',
    textAlign: 'center'
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  ctaTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: '1rem'
  },
  ctaText: {
    color: '#aaa',
    marginBottom: '1.5rem'
  },
  ctaButton: {
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    border: 'none',
    borderRadius: '40px',
    padding: '12px 32px',
    color: '#1a1a2e',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  scrollTopBtn: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    transition: 'all 0.3s'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.95)',
    backdropFilter: 'blur(8px)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
  },
  modalContent: {
    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    borderRadius: '24px',
    maxWidth: '500px',
    width: '100%',
    padding: '2rem',
    position: 'relative',
    border: '1px solid rgba(255,215,0,0.3)',
    textAlign: 'center'
  },
  modalClose: {
    position: 'absolute',
    top: '15px',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#fff'
  },
  modalTitle: {
    color: '#ffd700',
    fontSize: '1.5rem',
    marginBottom: '1rem'
  },
  modalText: {
    color: '#aaa',
    marginBottom: '1.5rem'
  },
  modalVideo: {
    background: 'rgba(255,215,0,0.1)',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  modalVideoIcon: {
    fontSize: '3rem',
    color: '#ffd700',
    marginBottom: '0.5rem'
  },
  modalButton: {
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    border: 'none',
    borderRadius: '40px',
    padding: '10px 24px',
    color: '#1a1a2e',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  modalResourceIcon: {
    fontSize: '3rem',
    color: '#ffd700',
    marginBottom: '1rem'
  }
};

export default GoDiamondPage;