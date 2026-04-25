// components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: 'Brian Shitambasi',
    email: 'brianshtambasi270@gmail.com',
    phone: '+254 116 378188',
    location: 'Kakamega, Kenya',
    bio: 'Full Stack Developer & Network Marketing Professional',
    joinDate: '2024',
    role: 'Founder & CEO',
    avatar: '/static/image/IMG_20260215_112337_HDR.jpg'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [showAlert, setShowAlert] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setFormData(JSON.parse(savedProfile));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setProfile(formData);
    localStorage.setItem('userProfile', JSON.stringify(formData));
    setIsEditing(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const stats = [
    { label: 'Coffee Chats', value: '12', icon: 'fa-coffee', color: '#ffd700' },
    { label: 'Webinars Attended', value: '5', icon: 'fa-video', color: '#ff6347' },
    { label: 'Downloads', value: '28', icon: 'fa-download', color: '#4caf50' },
    { label: 'Referrals', value: '7', icon: 'fa-users', color: '#2196f3' }
  ];

  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #05070a 0%, #0a0f1a 100%)', 
      minHeight: '100vh', 
      paddingTop: '100px',
      paddingBottom: '60px'
    }}>
      <Container>
        {showAlert && (
          <Alert variant="success" className="text-center rounded-pill mb-4" dismissible onClose={() => setShowAlert(false)}>
            <i className="fas fa-check-circle me-2"></i> Profile updated successfully!
          </Alert>
        )}

        <Row>
          {/* Sidebar */}
          <Col lg={4} className="mb-4">
            <Card className="border-0 rounded-4 shadow-lg text-center" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
              <Card.Body className="p-4">
                <div className="position-relative d-inline-block mx-auto mb-3">
                  <img 
                    src={profile.avatar}
                    alt={profile.fullName}
                    className="rounded-circle"
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      border: '3px solid #ffd700'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?background=ffd700&color=1a1a2e&name=${profile.fullName.split(' ')[0]}+${profile.fullName.split(' ')[1] || ''}`;
                    }}
                  />
                  <div className="position-absolute bottom-0 end-0 bg-success rounded-circle p-1" style={{ border: '2px solid #1a1a2e' }}>
                    <i className="fas fa-check-circle text-white" style={{ fontSize: '12px' }}></i>
                  </div>
                </div>
                <h4 className="fw-bold mb-1" style={{ color: '#fff' }}>{profile.fullName}</h4>
                <p className="mb-2" style={{ color: '#ffd700' }}>{profile.role}</p>
                <p className="small mb-3" style={{ color: '#aaa' }}>
                  <i className="fas fa-calendar-alt me-1"></i> Member since {profile.joinDate}
                </p>
                
                <div className="d-flex gap-2 mb-3">
                  <Button 
                    variant={activeTab === 'profile' ? 'warning' : 'outline-warning'}
                    size="sm" 
                    className="rounded-pill flex-grow-1"
                    onClick={() => setActiveTab('profile')}
                  >
                    <i className="fas fa-user me-1"></i> Profile
                  </Button>
                  <Button 
                    variant={activeTab === 'security' ? 'warning' : 'outline-warning'}
                    size="sm" 
                    className="rounded-pill flex-grow-1"
                    onClick={() => setActiveTab('security')}
                  >
                    <i className="fas fa-lock me-1"></i> Security
                  </Button>
                </div>
                
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  className="rounded-pill w-100"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/';
                  }}
                >
                  <i className="fas fa-sign-out-alt me-2"></i> Logout
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content */}
          <Col lg={8}>
            {activeTab === 'profile' && (
              <>
                {/* Stats Cards */}
                <Row className="g-3 mb-4">
                  {stats.map((stat, idx) => (
                    <Col md={3} sm={6} key={idx}>
                      <Card className="border-0 rounded-4 text-center h-100" style={{ background: 'rgba(15, 20, 30, 0.7)', border: '1px solid rgba(255,215,0,0.1)' }}>
                        <Card.Body className="p-3">
                          <i className={`fas ${stat.icon} fa-2x mb-2`} style={{ color: stat.color }}></i>
                          <h3 className="fw-bold mb-0" style={{ color: stat.color }}>{stat.value}</h3>
                          <small style={{ color: '#aaa' }}>{stat.label}</small>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {/* Profile Info Card */}
                <Card className="border-0 rounded-4 shadow-lg" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h3 className="fw-bold mb-0" style={{ color: '#ffd700' }}>
                        <i className="fas fa-user-circle me-2"></i> Personal Information
                      </h3>
                      {!isEditing && (
                        <Button variant="warning" size="sm" className="rounded-pill" onClick={() => setIsEditing(true)}>
                          <i className="fas fa-edit me-1"></i> Edit
                        </Button>
                      )}
                    </div>

                    {isEditing ? (
                      <Form>
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Label style={{ color: '#ffd700' }}>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
                            />
                          </Col>
                          <Col md={6} className="mb-3">
                            <Form.Label style={{ color: '#ffd700' }}>Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
                            />
                          </Col>
                          <Col md={6} className="mb-3">
                            <Form.Label style={{ color: '#ffd700' }}>Phone</Form.Label>
                            <Form.Control
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
                            />
                          </Col>
                          <Col md={6} className="mb-3">
                            <Form.Label style={{ color: '#ffd700' }}>Location</Form.Label>
                            <Form.Control
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
                            />
                          </Col>
                          <Col md={12} className="mb-3">
                            <Form.Label style={{ color: '#ffd700' }}>Bio</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="bio"
                              rows={3}
                              value={formData.bio}
                              onChange={handleInputChange}
                              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
                            />
                          </Col>
                        </Row>
                        <div className="d-flex gap-2 mt-3">
                          <Button variant="warning" className="rounded-pill px-4" onClick={handleSave}>
                            <i className="fas fa-save me-2"></i> Save Changes
                          </Button>
                          <Button variant="outline-secondary" className="rounded-pill px-4" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                        </div>
                      </Form>
                    ) : (
                      <div>
                        <Row>
                          <Col md={6} className="mb-3">
                            <p className="mb-1" style={{ color: '#aaa' }}><i className="fas fa-user me-2" style={{ color: '#ffd700' }}></i>Full Name</p>
                            <p className="fw-semibold" style={{ color: '#fff' }}>{profile.fullName}</p>
                          </Col>
                          <Col md={6} className="mb-3">
                            <p className="mb-1" style={{ color: '#aaa' }}><i className="fas fa-envelope me-2" style={{ color: '#ffd700' }}></i>Email</p>
                            <p className="fw-semibold" style={{ color: '#fff' }}>{profile.email}</p>
                          </Col>
                          <Col md={6} className="mb-3">
                            <p className="mb-1" style={{ color: '#aaa' }}><i className="fas fa-phone me-2" style={{ color: '#ffd700' }}></i>Phone</p>
                            <p className="fw-semibold" style={{ color: '#fff' }}>{profile.phone}</p>
                          </Col>
                          <Col md={6} className="mb-3">
                            <p className="mb-1" style={{ color: '#aaa' }}><i className="fas fa-map-marker-alt me-2" style={{ color: '#ffd700' }}></i>Location</p>
                            <p className="fw-semibold" style={{ color: '#fff' }}>{profile.location}</p>
                          </Col>
                          <Col md={12}>
                            <p className="mb-1" style={{ color: '#aaa' }}><i className="fas fa-info-circle me-2" style={{ color: '#ffd700' }}></i>Bio</p>
                            <p className="fw-semibold" style={{ color: '#fff' }}>{profile.bio}</p>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </>
            )}

            {activeTab === 'security' && (
              <Card className="border-0 rounded-4 shadow-lg" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
                <Card.Body className="p-4">
                  <h3 className="fw-bold mb-4" style={{ color: '#ffd700' }}>
                    <i className="fas fa-shield-alt me-2"></i> Security Settings
                  </h3>
                  <Form>
                    <div className="mb-3">
                      <Form.Label style={{ color: '#ffd700' }}>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter current password"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
                      />
                    </div>
                    <div className="mb-3">
                      <Form.Label style={{ color: '#ffd700' }}>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
                      />
                    </div>
                    <div className="mb-4">
                      <Form.Label style={{ color: '#ffd700' }}>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm new password"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
                      />
                    </div>
                    <Button variant="warning" className="rounded-pill px-4">
                      <i className="fas fa-key me-2"></i> Update Password
                    </Button>
                  </Form>

                  <hr className="my-4" style={{ borderColor: 'rgba(255,215,0,0.2)' }} />

                  <h4 className="fw-bold mb-3" style={{ color: '#ff6347' }}>Danger Zone</h4>
                  <Button variant="outline-danger" className="rounded-pill">
                    <i className="fas fa-trash-alt me-2"></i> Delete Account
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;