// components/Contact.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const mapRef = useRef(null);

  // Contact team members
  const supportContacts = [
    {
      name: 'Brian Shitambasi',
      title: 'CEO & Founder',
      phone: '+254116378188',
      phoneShort: '0116 378188',
      email: 'ceo@apexlegacy.com',
      whatsapp: '254116378188',
      image: '/static/image/IMG_20260215_112337_HDR.jpg',
      color: '#ffd700',
      social: {
        linkedin: 'https://linkedin.com/in/brianshitambasi',
        github: 'https://github.com/brianshitambasi',
        twitter: 'https://twitter.com/brianshitambasi'
      }
    }
  ];

  // FAQ data
  const faqs = [
    { q: "How quickly will I get a response?", a: "Within 24 hours during business days. For urgent matters, call us directly." },
    { q: "Do you offer support globally?", a: "Yes! Our team supports partners worldwide across multiple time zones." },
    { q: "Can I schedule a personal consultation?", a: "Absolutely! Click 'Schedule Coffee Chat' on the homepage to book a free session." },
    { q: "What are your office hours?", a: "Monday-Friday: 8AM-8PM, Saturday: 9AM-5PM (EAT). Sunday closed." }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    setAlertType('success');
    setShowAlert(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleCallNow = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone) => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  // Google Maps iframe
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
    
    window.initMap = () => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 0.0236, lng: 37.9062 },
          zoom: 12,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#ffd700" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#2a2a3e" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a0a1a" }] }
          ]
        });
        
        new window.google.maps.Marker({
          position: { lat: 0.0236, lng: 37.9062 },
          map: map,
          title: "Apex Legacy - Kenya",
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/gold-dot.png"
          }
        });
      }
    };
    
    return () => {
      delete window.initMap;
    };
  }, []);

  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #05070a 0%, #0a0f1a 50%, #05070a 100%)', 
      minHeight: '100vh', 
      paddingTop: '100px',
      paddingBottom: '60px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={styles.bgElement1}></div>
      <div style={styles.bgElement2}></div>
      <div style={styles.bgElement3}></div>
      
      <Container style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div className="text-center mb-5" data-aos="fade-up">
          <Badge 
            bg="warning" 
            className="px-4 py-2 rounded-pill mb-3"
            style={{ background: 'rgba(255, 215, 0, 0.2)', color: '#ffd700', border: 'none' }}
          >
            <i className="fas fa-headset me-2"></i> 24/7 SUPPORT
          </Badge>
          <h1 className="display-4 fw-bold mb-3">
            Get in <span style={{ 
              background: 'linear-gradient(135deg, #ffd700, #ff6347)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}>Touch</span>
          </h1>
          <div className="gold-divider"></div>
          <p style={{ color: '#aaa', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            We're here to answer your questions and support your journey to success
          </p>
        </div>

        {/* Alert */}
        {showAlert && (
          <Alert 
            variant={alertType} 
            className="text-center rounded-pill mb-4" 
            onClose={() => setShowAlert(false)} 
            dismissible 
            style={{ 
              background: alertType === 'success' ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)', 
              border: `1px solid ${alertType === 'success' ? '#2ecc71' : '#e74c3c'}`,
              color: alertType === 'success' ? '#2ecc71' : '#e74c3c',
              backdropFilter: 'blur(10px)'
            }}
          >
            <i className={`fas ${alertType === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
            {alertType === 'success' ? 'Message sent successfully! We\'ll respond within 24 hours.' : 'Something went wrong. Please try again.'}
          </Alert>
        )}

        <Row>
          {/* Leadership Team Section */}
          <Col lg={7} className="mb-4">
            <div className="d-flex align-items-center gap-2 mb-4">
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#ffd700', width: '40px', height: '40px' }}>
                <i className="fas fa-crown" style={{ color: '#1a1a2e' }}></i>
              </div>
              <h3 className="fw-bold mb-0" style={{ color: '#ffd700' }}>Leadership Team</h3>
            </div>
            
            <Row>
              {supportContacts.map((contact, idx) => (
                <Col md={12} key={idx} className="mb-4" data-aos="fade-right" data-aos-delay={idx * 100}>
                  <Card className="border-0 rounded-4 shadow-lg card-hover" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 215, 0, 0.2)', overflow: 'hidden' }}>
                    <div style={{ height: '4px', background: `linear-gradient(90deg, ${contact.color}, #ff6347)`, borderRadius: '4px 4px 0 0' }}></div>
                    <Card.Body className="p-4">
                      <Row className="align-items-center">
                        <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
                          <div className="position-relative d-inline-block">
                            <img 
                              src={contact.image}
                              alt={contact.name}
                              className="rounded-circle"
                              style={{
                                width: '120px',
                                height: '120px',
                                objectFit: 'cover',
                                border: `3px solid ${contact.color}`,
                                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?background=${contact.color.replace('#', '')}&color=fff&name=${contact.name.split(' ')[0]}+${contact.name.split(' ')[1] || ''}`;
                              }}
                            />
                            <div className="position-absolute bottom-0 end-0 bg-success rounded-circle p-1" style={{ border: '2px solid #1a1a2e' }}>
                              <i className="fas fa-check-circle text-white" style={{ fontSize: '12px' }}></i>
                            </div>
                          </div>
                        </Col>
                        <Col md={8}>
                          <h4 className="fw-bold mb-1" style={{ color: '#fff' }}>{contact.name}</h4>
                          <p className="mb-2" style={{ color: contact.color, fontWeight: 'semibold' }}>{contact.title}</p>
                          <div className="mb-3">
                            <p className="mb-1" style={{ color: '#aaa' }}>
                              <i className="fas fa-phone-alt" style={{ color: '#ffd700', width: '25px' }}></i>
                              <strong className="ms-2">{contact.phoneShort}</strong>
                            </p>
                            <p className="mb-1" style={{ color: '#aaa' }}>
                              <i className="fas fa-envelope" style={{ color: '#ffd700', width: '25px' }}></i>
                              <small className="ms-2">{contact.email}</small>
                            </p>
                            <p className="mb-0" style={{ color: '#aaa' }}>
                              <i className="fab fa-whatsapp" style={{ color: '#25D366', width: '25px' }}></i>
                              <small className="ms-2">Available on WhatsApp</small>
                            </p>
                          </div>
                          <div className="d-flex gap-2 flex-wrap">
                            <Button 
                              variant="outline-warning" 
                              size="sm" 
                              className="rounded-pill px-4" 
                              onClick={() => handleCallNow(contact.phone)}
                              style={{ borderColor: '#ffd700', color: '#ffd700' }}
                            >
                              <i className="fas fa-phone-alt me-2"></i> Call Now
                            </Button>
                            <Button 
                              size="sm" 
                              className="rounded-pill px-4 d-flex align-items-center gap-2" 
                              style={{ background: '#25D366', border: 'none' }} 
                              onClick={() => handleWhatsApp(contact.whatsapp)}
                            >
                              <i className="fab fa-whatsapp"></i> WhatsApp
                            </Button>
                            <div className="d-flex gap-2 ms-auto">
                              <a href={contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,119,181,0.2)', width: '35px', height: '35px', transition: 'all 0.3s' }}>
                                  <i className="fab fa-linkedin-in" style={{ color: '#0077b5' }}></i>
                                </div>
                              </a>
                              <a href={contact.social.github} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: 'rgba(255,255,255,0.1)', width: '35px', height: '35px', transition: 'all 0.3s' }}>
                                  <i className="fab fa-github" style={{ color: '#fff' }}></i>
                                </div>
                              </a>
                              <a href={contact.social.twitter} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: 'rgba(29,161,242,0.2)', width: '35px', height: '35px', transition: 'all 0.3s' }}>
                                  <i className="fab fa-twitter" style={{ color: '#1DA1F2' }}></i>
                                </div>
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* FAQ Section */}
            <div className="mt-4" data-aos="fade-up">
              <h4 className="fw-bold mb-3" style={{ color: '#ffd700' }}>
                <i className="fas fa-question-circle me-2"></i> Frequently Asked Questions
              </h4>
              <div className="row g-3">
                {faqs.map((faq, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="p-3 rounded-4 h-100" style={{ background: 'rgba(15, 20, 30, 0.7)', border: '1px solid rgba(255,215,0,0.1)' }}>
                      <strong style={{ color: '#ffd700' }}>{faq.q}</strong>
                      <p className="mb-0 mt-2" style={{ color: '#aaa', fontSize: '0.9rem' }}>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* Contact Form Section */}
          <Col lg={5} className="mb-4" data-aos="fade-left">
            <Card className="border-0 rounded-4 shadow-lg h-100" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#ffd700', width: '40px', height: '40px' }}>
                    <i className="fas fa-paper-plane" style={{ color: '#1a1a2e' }}></i>
                  </div>
                  <h3 className="fw-bold mb-0" style={{ color: '#ffd700' }}>Send a Message</h3>
                </div>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ffd700' }}>
                      <i className="fas fa-user me-2"></i> Full Name *
                    </Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required 
                      className="rounded-pill"
                      style={{
                        background: focusedField === 'name' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${focusedField === 'name' ? '#ffd700' : 'rgba(255, 215, 0, 0.3)'}`,
                        color: '#fff',
                        transition: 'all 0.3s'
                      }}
                      placeholder="Enter your full name"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ffd700' }}>
                      <i className="fas fa-envelope me-2"></i> Email Address *
                    </Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required 
                      className="rounded-pill"
                      style={{
                        background: focusedField === 'email' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${focusedField === 'email' ? '#ffd700' : 'rgba(255, 215, 0, 0.3)'}`,
                        color: '#fff',
                        transition: 'all 0.3s'
                      }}
                      placeholder="your@email.com"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ffd700' }}>
                      <i className="fas fa-phone me-2"></i> Phone Number
                    </Form.Label>
                    <Form.Control 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className="rounded-pill"
                      style={{
                        background: focusedField === 'phone' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${focusedField === 'phone' ? '#ffd700' : 'rgba(255, 215, 0, 0.3)'}`,
                        color: '#fff',
                        transition: 'all 0.3s'
                      }}
                      placeholder="+254 XXX XXX XXX"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ffd700' }}>
                      <i className="fas fa-tag me-2"></i> Subject *
                    </Form.Label>
                    <Form.Control 
                      type="text" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleInputChange} 
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required 
                      className="rounded-pill"
                      style={{
                        background: focusedField === 'subject' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${focusedField === 'subject' ? '#ffd700' : 'rgba(255, 215, 0, 0.3)'}`,
                        color: '#fff',
                        transition: 'all 0.3s'
                      }}
                      placeholder="What is this regarding?"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#ffd700' }}>
                      <i className="fas fa-comment me-2"></i> Message *
                    </Form.Label>
                    <Form.Control 
                      as="textarea" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={5} 
                      required 
                      style={{
                        background: focusedField === 'message' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${focusedField === 'message' ? '#ffd700' : 'rgba(255, 215, 0, 0.3)'}`,
                        color: '#fff',
                        borderRadius: '16px',
                        transition: 'all 0.3s'
                      }}
                      placeholder="Tell us how we can help you..."
                    />
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    className="w-100 py-3 rounded-pill fw-bold" 
                    disabled={isSubmitting}
                    style={{ 
                      background: 'linear-gradient(90deg, #ffd700, #ff8c00)', 
                      border: 'none', 
                      color: '#1a1a2e',
                      transition: 'all 0.3s',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                  >
                    {isSubmitting ? (
                      <><i className="fas fa-spinner fa-spin me-2"></i> Sending...</>
                    ) : (
                      <><i className="fas fa-paper-plane me-2"></i> Send Message</>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Contact Bar */}
        <div className="mt-5 p-4 rounded-4" style={{ background: 'linear-gradient(135deg, rgba(15,20,30,0.95), rgba(10,15,25,0.95))', border: '1px solid rgba(255, 215, 0, 0.2)' }} data-aos="fade-up">
          <Row className="align-items-center text-center">
            <Col md={4} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ background: '#ffd700', width: '55px', height: '55px' }}>
                  <i className="fas fa-phone-alt fa-lg" style={{ color: '#1a1a2e' }}></i>
                </div>
                <div className="text-start">
                  <small style={{ color: '#aaa' }} className="d-block">Call Directly</small>
                  <strong style={{ color: '#ffd700' }} className="fs-5">+254 116 378188</strong>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ background: '#ffd700', width: '55px', height: '55px' }}>
                  <i className="fas fa-envelope fa-lg" style={{ color: '#1a1a2e' }}></i>
                </div>
                <div className="text-start">
                  <small style={{ color: '#aaa' }} className="d-block">Email Us</small>
                  <strong style={{ color: '#ffd700' }} className="fs-6">hello@apexlegacy.com</strong>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ background: '#25D366', width: '55px', height: '55px' }}>
                  <i className="fab fa-whatsapp fa-lg" style={{ color: '#fff' }}></i>
                </div>
                <div className="text-start">
                  <small style={{ color: '#aaa' }} className="d-block">WhatsApp Support</small>
                  <strong style={{ color: '#25D366' }} className="fs-6">+254 116 378188</strong>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Office Hours */}
        <div className="text-center mt-4">
          <p className="mb-0" style={{ color: '#aaa' }}>
            <i className="fas fa-clock me-2" style={{ color: '#ffd700' }}></i>
            <span style={{ color: '#fff' }}><strong>Office Hours:</strong></span> Monday - Friday: 8:00 AM - 8:00 PM | Saturday: 9:00 AM - 5:00 PM | Sunday: Closed
          </p>
          <p className="mt-2 small" style={{ color: '#666' }}>
            <i className="fas fa-globe me-1"></i> Timezone: East African Time (EAT)
          </p>
        </div>
      </Container>

      <style>{`
        .gold-divider {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #ffd700, #ff6347);
          margin: 20px auto;
          border-radius: 2px;
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4) !important;
          border-color: rgba(255, 215, 0, 0.4) !important;
        }
        .form-control:focus {
          outline: none;
          box-shadow: none;
        }
        .btn-outline-warning:hover {
          background: #ffd700;
          color: #1a1a2e;
        }
        .rounded-circle:hover {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .card-hover {
            margin-bottom: 15px;
          }
        }
      `}</style>
    </section>
  );
};

// Background animation styles
const styles = {
  bgElement1: {
    position: 'absolute',
    top: '10%',
    left: '-10%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 20s ease-in-out infinite',
    zIndex: 0
  },
  bgElement2: {
    position: 'absolute',
    bottom: '10%',
    right: '-5%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(255,100,50,0.05) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 25s ease-in-out infinite reverse',
    zIndex: 0
  },
  bgElement3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(255,215,0,0.03) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'pulse 10s ease-in-out infinite',
    transform: 'translate(-50%, -50%)',
    zIndex: 0
  }
};

// Add animation keyframes
const animationStyle = document.createElement('style');
animationStyle.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    50% { transform: translateY(-30px) translateX(20px); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
  }
  [data-aos] {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
document.head.appendChild(animationStyle);

export default Contact;