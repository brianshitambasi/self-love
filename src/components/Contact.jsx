// components/Contact.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  // Your contact team members
  const supportContacts = [
    {
      name: 'yobby',
      title: 'CEO & Founder',
      phone: '+254116378188',
      phoneShort: '0116 378188',
      email: 'ceo@apexlegacy.com',
      image: 'image/IMG_20260215_112337_HDR.jpg',
      color: '#D4AF37'
    },
    
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowAlert(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleCallNow = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone) => {
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
  };

  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #05070a, #0a0f1a)', 
      minHeight: '100vh', 
      paddingTop: '100px',
      paddingBottom: '60px'
    }}>
      <Container>
        <div className="text-center mb-5">
          <span className="badge px-4 py-2 rounded-pill mb-3" style={{ background: 'rgba(255, 215, 0, 0.2)', color: '#ffd700' }}>
            <i className="fas fa-headset me-2"></i> 24/7 SUPPORT
          </span>
          <h2 className="display-4 fw-bold mb-3">
            Contact <span style={{ color: '#ffd700' }}>Support</span>
          </h2>
          <div className="gold-divider"></div>
          <p style={{ color: '#aaa', fontSize: '1.1rem' }}>Our dedicated team is here to assist you on your journey to success</p>
        </div>

        {showAlert && (
          <Alert variant="success" className="text-center rounded-pill" onClose={() => setShowAlert(false)} dismissible style={{ background: 'rgba(46, 204, 113, 0.2)', border: '1px solid #2ecc71', color: '#2ecc71' }}>
            <i className="fas fa-check-circle me-2"></i>
            Thank you! We will get back to you within 24 hours.
          </Alert>
        )}

        <Row>
          <Col lg={7} className="mb-4">
            <h3 className="fw-bold mb-4" style={{ color: '#ffd700' }}>
              <i className="fas fa-gem me-2"></i>
              Leadership Team
            </h3>
            <Row>
              {supportContacts.map((contact, idx) => (
                <Col md={6} key={idx} className="mb-4">
                  <Card className="h-100 border-0 rounded-4 shadow-sm card-hover" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
                    <div style={{ height: '4px', background: contact.color, borderRadius: '4px 4px 0 0' }}></div>
                    <Card.Body className="p-4 text-center">
                      {/* Profile Image */}
                      <div className="mb-3">
                        <img 
                          src={contact.image}
                          alt={contact.name}
                          className="rounded-circle"
                          style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            border: `3px solid ${contact.color}`,
                            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?background=${contact.color.replace('#', '')}&color=fff&name=${contact.name.charAt(0)}`;
                          }}
                        />
                      </div>
                      <h5 className="fw-bold mb-1" style={{ color: '#fff' }}>{contact.name}</h5>
                      <p className="small mb-3" style={{ color: contact.color }}>{contact.title}</p>
                      <div className="mb-3">
                        <p className="mb-1" style={{ color: '#aaa' }}>
                          <i className="fas fa-phone-alt" style={{ color: '#ffd700', marginRight: '8px' }}></i>
                          <strong>{contact.phoneShort}</strong>
                        </p>
                        <p className="mb-0" style={{ color: '#aaa' }}>
                          <i className="fas fa-envelope" style={{ color: '#ffd700', marginRight: '8px' }}></i>
                          <small>{contact.email}</small>
                        </p>
                      </div>
                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-warning" 
                          size="sm" 
                          className="rounded-pill flex-grow-1" 
                          onClick={() => handleCallNow(contact.phone)}
                          style={{ borderColor: '#ffd700', color: '#ffd700' }}
                        >
                          <i className="fas fa-phone-alt me-1"></i> Call
                        </Button>
                        <Button 
                          size="sm" 
                          className="rounded-pill flex-grow-1" 
                          style={{ background: '#25D366', border: 'none' }} 
                          onClick={() => handleWhatsApp(contact.phone)}
                        >
                          <i className="fab fa-whatsapp me-1"></i> WhatsApp
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          <Col lg={5} className="mb-4">
            <Card className="border-0 rounded-4 shadow-sm h-100" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
              <Card.Body className="p-4">
                <h3 className="fw-bold mb-4" style={{ color: '#ffd700' }}>
                  <i className="fas fa-paper-plane me-2"></i>
                  Send Message
                </h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ffd700' }}>Your Name *</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                      className="rounded-pill"
                      style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 215, 0, 0.3)', color: '#fff' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ffd700' }}>Email Address *</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required 
                      className="rounded-pill"
                      style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 215, 0, 0.3)', color: '#fff' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ffd700' }}>Phone Number</Form.Label>
                    <Form.Control 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      className="rounded-pill"
                      style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 215, 0, 0.3)', color: '#fff' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ffd700' }}>Subject *</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleInputChange} 
                      required 
                      className="rounded-pill"
                      style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 215, 0, 0.3)', color: '#fff' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ffd700' }}>Message *</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      rows={4} 
                      required 
                      style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 215, 0, 0.3)', color: '#fff', borderRadius: '16px' }}
                    />
                  </Form.Group>
                  <Button 
                    type="submit" 
                    className="w-100 py-2 rounded-pill fw-bold" 
                    style={{ background: 'linear-gradient(90deg, #ffd700, #ff8c00)', border: 'none', color: '#1a1a2e' }}
                  >
                    <i className="fas fa-paper-plane me-2"></i> Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Contact Bar */}
        <div className="text-center mt-4 p-4 rounded-4" style={{ background: 'linear-gradient(135deg, rgba(15,20,30,0.95), rgba(10,15,25,0.95))', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
          <Row className="align-items-center">
            <Col md={4} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#ffd700', width: '40px', height: '40px' }}>
                  <i className="fas fa-phone-alt" style={{ color: '#1a1a2e' }}></i>
                </div>
                <div>
                  <small style={{ color: '#aaa' }} className="d-block">Call Directly</small>
                  <strong style={{ color: '#ffd700' }} className="fs-6">+254 116 378188</strong>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#ffd700', width: '40px', height: '40px' }}>
                  <i className="fas fa-envelope" style={{ color: '#1a1a2e' }}></i>
                </div>
                <div>
                  <small style={{ color: '#aaa' }} className="d-block">Email Us</small>
                  <strong style={{ color: '#ffd700' }} className="fs-6">hello@apexlegacy.com</strong>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#25D366', width: '40px', height: '40px' }}>
                  <i className="fab fa-whatsapp" style={{ color: '#fff' }}></i>
                </div>
                <div>
                  <small style={{ color: '#aaa' }} className="d-block">WhatsApp Support</small>
                  <strong style={{ color: '#25D366' }} className="fs-6">+254 116 378188</strong>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Office Hours */}
        <div className="text-center mt-4">
          <p style={{ color: '#aaa' }} className="mb-0">
            <i className="fas fa-clock me-2" style={{ color: '#ffd700' }}></i>
            <strong>Office Hours:</strong> Monday - Friday: 8:00 AM - 8:00 PM | Saturday: 9:00 AM - 5:00 PM | Sunday: Closed
          </p>
        </div>
      </Container>

      <style>{`
        .gold-divider {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #ffd700, #ff8c00);
          margin: 20px auto;
          border-radius: 2px;
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
          border-color: rgba(255, 215, 0, 0.4) !important;
        }
        .form-control:focus {
          border-color: #ffd700 !important;
          box-shadow: 0 0 0 0.2rem rgba(255, 215, 0, 0.25) !important;
          background: rgba(255, 255, 255, 0.15) !important;
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

export default Contact;