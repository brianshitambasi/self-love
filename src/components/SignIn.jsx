// components/SignIn.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Demo login - accept any email/password for demo
      if (formData.email && formData.password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email);
        setAlertMessage('Login successful! Redirecting...');
        setShowAlert(true);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        setAlertMessage('Please enter email and password');
        setShowAlert(true);
      }
    } else {
      // Demo registration
      if (formData.name && formData.email && formData.password && formData.password === formData.confirmPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', formData.name);
        setAlertMessage('Registration successful! Redirecting...');
        setShowAlert(true);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else if (formData.password !== formData.confirmPassword) {
        setAlertMessage('Passwords do not match');
        setShowAlert(true);
      } else {
        setAlertMessage('Please fill in all fields');
        setShowAlert(true);
      }
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', 'guest@apexlegacy.com');
    localStorage.setItem('userName', 'Guest User');
    window.location.href = '/dashboard';
  };

  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #05070a 0%, #0a0f1a 100%)', 
      minHeight: '100vh', 
      paddingTop: '100px',
      paddingBottom: '60px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <Card className="border-0 rounded-4 shadow-lg" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px', background: 'rgba(255,215,0,0.2)' }}>
                    <i className="fas fa-gem fa-2x" style={{ color: '#ffd700' }}></i>
                  </div>
                  <h2 className="fw-bold mb-2" style={{ color: '#ffd700' }}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p style={{ color: '#aaa' }}>
                    {isLogin ? 'Sign in to continue your journey' : 'Join Apex Legacy today'}
                  </p>
                </div>

                {showAlert && (
                  <Alert variant="info" className="rounded-pill text-center" dismissible onClose={() => setShowAlert(false)}>
                    {alertMessage}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#ffd700' }}>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="rounded-pill"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
                        required={!isLogin}
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ffd700' }}>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="rounded-pill"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ffd700' }}>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="rounded-pill"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
                      required
                    />
                  </Form.Group>

                  {!isLogin && (
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#ffd700' }}>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className="rounded-pill"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
                        required={!isLogin}
                      />
                    </Form.Group>
                  )}

                  {isLogin && (
                    <div className="text-end mb-3">
                      <a href="#" style={{ color: '#ffd700', textDecoration: 'none' }}>Forgot Password?</a>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-100 py-2 rounded-pill fw-bold mb-3"
                    style={{ background: 'linear-gradient(90deg, #ffd700, #ff8c00)', border: 'none', color: '#1a1a2e' }}
                  >
                    <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} me-2`}></i>
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Button>

                  <Button 
                    variant="outline-light" 
                    className="w-100 py-2 rounded-pill mb-3"
                    onClick={handleGuestLogin}
                  >
                    <i className="fas fa-user-friends me-2"></i> Continue as Guest
                  </Button>

                  <div className="text-center">
                    <p style={{ color: '#aaa' }}>
                      {isLogin ? "Don't have an account? " : "Already have an account? "}
                      <Button 
                        variant="link" 
                        className="p-0" 
                        style={{ color: '#ffd700', textDecoration: 'none' }}
                        onClick={() => {
                          setIsLogin(!isLogin);
                          setFormData({ email: '', password: '', name: '', confirmPassword: '' });
                          setShowAlert(false);
                        }}
                      >
                        {isLogin ? 'Create one' : 'Sign in'}
                      </Button>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <p className="small" style={{ color: '#666' }}>
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <a href="/privacy" style={{ color: '#666', textDecoration: 'none' }}>Privacy</a>
                <a href="/terms" style={{ color: '#666', textDecoration: 'none' }}>Terms</a>
                <a href="/explore" style={{ color: '#666', textDecoration: 'none' }}>Explore</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignIn;