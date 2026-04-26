// components/SignIn.jsx - Complete with Google Sheets Integration
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { saveUserToSheet } from '../services/api';

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    phone: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');
  const [isLoading, setIsLoading] = useState(false);

  // Helper functions
  const saveUserToLocalStorage = (user) => {
    const existingUsers = localStorage.getItem('registeredUsers');
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    
    const userExists = users.find(u => u.email === user.email);
    if (!userExists) {
      users.push(user);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    }
  };

  const loginUser = (email, password) => {
    // Admin login
    if (email === 'admin@apexlegacy.com' && password === 'Brian@2025') {
      const adminUser = {
        id: 'admin-001',
        name: 'Brian Shitambasi',
        email: email,
        role: 'admin',
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', 'Brian Shitambasi');
      return { success: true, user: adminUser, role: 'admin' };
    }
    
    // Regular user login
    const existingUsers = localStorage.getItem('registeredUsers');
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const loggedInUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'user',
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', user.name);
      return { success: true, user: loggedInUser, role: 'user' };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const registerUser = (name, email, password, phone) => {
    const existingUsers = localStorage.getItem('registeredUsers');
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'User already exists with this email' };
    }
    
    const newUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      password: password,
      phone: phone || '',
      role: 'user',
      createdAt: new Date().toISOString(),
      profileComplete: false
    };
    
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    const loggedInUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: 'user',
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', 'user');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    
    return { success: true, user: newUser };
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (isLogin) {
      // Login
      if (!formData.email || !formData.password) {
        setAlertMessage('Please enter email and password');
        setAlertVariant('danger');
        setShowAlert(true);
        setIsLoading(false);
        return;
      }
      
      const result = loginUser(formData.email, formData.password);
      
      if (result.success) {
        setAlertMessage(`Welcome back ${result.user.name}! Redirecting to dashboard...`);
        setAlertVariant('success');
        setShowAlert(true);
        
        const welcomeNotification = {
          id: Date.now(),
          type: 'login',
          title: 'Welcome Back! 🎉',
          message: `Good to see you again, ${result.user.name}! Check out your dashboard for updates.`,
          date: new Date().toISOString(),
          read: false,
          icon: 'fa-smile-wink',
          color: '#ffd700',
          actionLink: '/dashboard'
        };
        
        const existingNotifs = localStorage.getItem('userNotifications');
        const notifications = existingNotifs ? JSON.parse(existingNotifs) : [];
        notifications.unshift(welcomeNotification);
        localStorage.setItem('userNotifications', JSON.stringify(notifications));
        
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        setAlertMessage(result.error);
        setAlertVariant('danger');
        setShowAlert(true);
        setIsLoading(false);
      }
    } else {
      // Registration
      if (!formData.name || !formData.email || !formData.password) {
        setAlertMessage('Please fill in all fields');
        setAlertVariant('danger');
        setShowAlert(true);
        setIsLoading(false);
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setAlertMessage('Passwords do not match');
        setAlertVariant('danger');
        setShowAlert(true);
        setIsLoading(false);
        return;
      }
      
      if (formData.password.length < 6) {
        setAlertMessage('Password must be at least 6 characters');
        setAlertVariant('danger');
        setShowAlert(true);
        setIsLoading(false);
        return;
      }
      
      const result = registerUser(formData.name, formData.email, formData.password, formData.phone);
      
      if (result.success) {
        // Save to Google Sheets
        try {
          await saveUserToSheet({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || '',
            referral: 'Website Registration'
          });
          console.log('✅ User saved to Google Sheet');
        } catch (sheetError) {
          console.error('Error saving to Google Sheet:', sheetError);
        }
        
        setAlertMessage(`Welcome ${formData.name}! Account created successfully. Redirecting...`);
        setAlertVariant('success');
        setShowAlert(true);
        
        const welcomeNotification = {
          id: Date.now(),
          type: 'welcome',
          title: 'Welcome to Apex Legacy! 🎉',
          message: `Thank you for joining, ${formData.name}! Start your journey by scheduling a coffee chat with Brian.`,
          date: new Date().toISOString(),
          read: false,
          icon: 'fa-hand-peace',
          color: '#4caf50',
          actionLink: '/'
        };
        
        const existingNotifs = localStorage.getItem('userNotifications');
        const notifications = existingNotifs ? JSON.parse(existingNotifs) : [];
        notifications.unshift(welcomeNotification);
        localStorage.setItem('userNotifications', JSON.stringify(notifications));
        
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        setAlertMessage(result.error);
        setAlertVariant('danger');
        setShowAlert(true);
        setIsLoading(false);
      }
    }
  };

  const handleGuestLogin = () => {
    const guestUser = {
      id: 'guest-' + Date.now(),
      name: 'Guest User',
      email: 'guest@apexlegacy.com',
      role: 'guest',
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(guestUser));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', 'guest');
    localStorage.setItem('userEmail', 'guest@apexlegacy.com');
    localStorage.setItem('userName', 'Guest User');
    
    setAlertMessage('Continuing as guest. Some features may be limited. Create an account for full access!');
    setAlertVariant('info');
    setShowAlert(true);
    
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  // Test Google Sheets Connection
  const testGoogleSheets = async () => {
    setIsLoading(true);
    try {
      const result = await saveUserToSheet({
        name: 'Test User ' + new Date().toLocaleTimeString(),
        email: 'test@example.com',
        phone: '1234567890',
        referral: 'Test Connection'
      });
      if (result.success) {
        setAlertMessage('✅ Test successful! Check your Google Sheet for the test entry.');
        setAlertVariant('success');
        setShowAlert(true);
      } else {
        setAlertMessage('❌ Test failed: ' + result.error);
        setAlertVariant('danger');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('❌ Error: ' + error.message);
      setAlertVariant('danger');
      setShowAlert(true);
    }
    setIsLoading(false);
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
                  <Alert variant={alertVariant} className="rounded-pill text-center" dismissible onClose={() => setShowAlert(false)}>
                    <i className={`fas ${alertVariant === 'success' ? 'fa-check-circle' : alertVariant === 'danger' ? 'fa-exclamation-circle' : 'fa-info-circle'} me-2`}></i>
                    {alertMessage}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#ffd700' }}>
                          <i className="fas fa-user me-2"></i>Full Name
                        </Form.Label>
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

                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#ffd700' }}>
                          <i className="fas fa-phone me-2"></i>Phone Number (Optional)
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="rounded-pill"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
                        />
                      </Form.Group>
                    </>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ffd700' }}>
                      <i className="fas fa-envelope me-2"></i>Email Address
                    </Form.Label>
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
                    <Form.Label style={{ color: '#ffd700' }}>
                      <i className="fas fa-lock me-2"></i>Password
                    </Form.Label>
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
                    {!isLogin && (
                      <small style={{ color: '#666' }}>Password must be at least 6 characters</small>
                    )}
                  </Form.Group>

                  {!isLogin && (
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#ffd700' }}>
                        <i className="fas fa-check-circle me-2"></i>Confirm Password
                      </Form.Label>
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
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <><i className="fas fa-spinner fa-spin me-2"></i>Processing...</>
                    ) : (
                      <><i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} me-2`}></i>{isLogin ? 'Sign In' : 'Create Account'}</>
                    )}
                  </Button>

                  <Button 
                    variant="outline-light" 
                    className="w-100 py-2 rounded-pill mb-3"
                    onClick={handleGuestLogin}
                    disabled={isLoading}
                  >
                    <i className="fas fa-user-friends me-2"></i> Continue as Guest
                  </Button>

                  {/* Test Google Sheets Button - Remove after testing */}
                  {!isLogin && (
                    <div className="text-center mb-3">
                      <Button 
                        variant="link" 
                        className="p-0 text-muted"
                        onClick={testGoogleSheets}
                        style={{ fontSize: '12px' }}
                        disabled={isLoading}
                      >
                        <i className="fas fa-plug me-1"></i> Test Google Sheets Connection
                      </Button>
                    </div>
                  )}

                  <div className="text-center">
                    <p style={{ color: '#aaa' }}>
                      {isLogin ? "Don't have an account? " : "Already have an account? "}
                      <Button 
                        variant="link" 
                        className="p-0" 
                        style={{ color: '#ffd700', textDecoration: 'none' }}
                        onClick={() => {
                          setIsLogin(!isLogin);
                          setFormData({ email: '', password: '', name: '', confirmPassword: '', phone: '' });
                          setShowAlert(false);
                        }}
                      >
                        {isLogin ? 'Create one' : 'Sign in'}
                      </Button>
                    </p>
                  </div>
                </Form>

                <div className="mt-3 pt-2 border-top" style={{ borderColor: 'rgba(255,215,0,0.1)' }}>
                  <small style={{ color: '#555', display: 'block', textAlign: 'center' }}>
                    <i className="fas fa-shield-alt me-1"></i>
                    Admin Access: admin@apexlegacy.com
                  </small>
                </div>
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