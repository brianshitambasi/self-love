// components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Badge } from 'react-bootstrap';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 8,
    completedWebinars: 3,
    upcomingEvents: 2,
    coffeeChats: 5,
    totalEarnings: 1250,
    referrals: 7
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'Booked Coffee Chat', date: '2024-01-15', status: 'completed', icon: 'fa-coffee' },
    { id: 2, action: 'Attended Webinar', date: '2024-01-10', status: 'completed', icon: 'fa-video' },
    { id: 3, action: 'Downloaded E-Book', date: '2024-01-05', status: 'completed', icon: 'fa-download' },
    { id: 4, action: 'Upcoming Coffee Chat', date: '2024-01-20', status: 'pending', icon: 'fa-calendar' }
  ]);

  const [progress, setProgress] = useState({
    profileComplete: 85,
    webinarAttendance: 60,
    goalAchievement: 40
  });

  useEffect(() => {
    // Load dashboard data from localStorage
    const savedStats = localStorage.getItem('dashboardStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #05070a 0%, #0a0f1a 100%)', 
      minHeight: '100vh', 
      paddingTop: '100px',
      paddingBottom: '60px'
    }}>
      <Container>
        {/* Welcome Header */}
        <div className="mb-4">
          <h1 className="display-5 fw-bold mb-2" style={{ color: '#fff' }}>
            Welcome back, <span style={{ color: '#ffd700' }}>Brian!</span>
          </h1>
          <p style={{ color: '#aaa' }}>Here's what's happening with your journey today.</p>
        </div>

        {/* Stats Cards */}
        <Row className="g-4 mb-4">
          <Col md={3} sm={6}>
            <Card className="border-0 rounded-4 h-100" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <Card.Body className="p-4 text-center">
                <div className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', background: 'rgba(255,215,0,0.2)' }}>
                  <i className="fas fa-calendar-check fa-2x" style={{ color: '#ffd700' }}></i>
                </div>
                <h2 className="fw-bold mb-0" style={{ color: '#ffd700' }}>{stats.totalBookings}</h2>
                <p style={{ color: '#aaa' }}>Total Bookings</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="border-0 rounded-4 h-100" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <Card.Body className="p-4 text-center">
                <div className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', background: 'rgba(255,99,71,0.2)' }}>
                  <i className="fas fa-video fa-2x" style={{ color: '#ff6347' }}></i>
                </div>
                <h2 className="fw-bold mb-0" style={{ color: '#ff6347' }}>{stats.completedWebinars}</h2>
                <p style={{ color: '#aaa' }}>Webinars Completed</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="border-0 rounded-4 h-100" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <Card.Body className="p-4 text-center">
                <div className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', background: 'rgba(76,175,80,0.2)' }}>
                  <i className="fas fa-coffee fa-2x" style={{ color: '#4caf50' }}></i>
                </div>
                <h2 className="fw-bold mb-0" style={{ color: '#4caf50' }}>{stats.coffeeChats}</h2>
                <p style={{ color: '#aaa' }}>Coffee Chats</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="border-0 rounded-4 h-100" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <Card.Body className="p-4 text-center">
                <div className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', background: 'rgba(33,150,243,0.2)' }}>
                  <i className="fas fa-users fa-2x" style={{ color: '#2196f3' }}></i>
                </div>
                <h2 className="fw-bold mb-0" style={{ color: '#2196f3' }}>{stats.referrals}</h2>
                <p style={{ color: '#aaa' }}>Referrals</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Progress Section */}
        <Row className="g-4 mb-4">
          <Col lg={6}>
            <Card className="border-0 rounded-4" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3" style={{ color: '#ffd700' }}>
                  <i className="fas fa-chart-line me-2"></i> Your Progress
                </h4>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span style={{ color: '#fff' }}>Profile Completion</span>
                    <span style={{ color: '#ffd700' }}>{progress.profileComplete}%</span>
                  </div>
                  <ProgressBar now={progress.profileComplete} variant="warning" style={{ height: '8px', borderRadius: '4px' }} />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span style={{ color: '#fff' }}>Webinar Attendance</span>
                    <span style={{ color: '#ff6347' }}>{progress.webinarAttendance}%</span>
                  </div>
                  <ProgressBar now={progress.webinarAttendance} variant="danger" style={{ height: '8px', borderRadius: '4px' }} />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span style={{ color: '#fff' }}>Goal Achievement</span>
                    <span style={{ color: '#4caf50' }}>{progress.goalAchievement}%</span>
                  </div>
                  <ProgressBar now={progress.goalAchievement} variant="success" style={{ height: '8px', borderRadius: '4px' }} />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="border-0 rounded-4" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3" style={{ color: '#ffd700' }}>
                  <i className="fas fa-bullhorn me-2"></i> Quick Actions
                </h4>
                <div className="d-grid gap-2">
                  <Button variant="warning" className="rounded-pill" onClick={() => window.location.href = '/coffee'}>
                    <i className="fas fa-coffee me-2"></i> Schedule Coffee Chat
                  </Button>
                  <Button variant="outline-warning" className="rounded-pill" onClick={() => window.location.href = '/webinar'}>
                    <i className="fas fa-video me-2"></i> Join Free Webinar
                  </Button>
                  <Button variant="outline-light" className="rounded-pill" onClick={() => window.location.href = '/go-diamond'}>
                    <i className="fas fa-gem me-2"></i> Explore Go Diamond
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activity */}
        <Card className="border-0 rounded-4" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
          <Card.Body className="p-4">
            <h4 className="fw-bold mb-3" style={{ color: '#ffd700' }}>
              <i className="fas fa-history me-2"></i> Recent Activity
            </h4>
            {recentActivities.map((activity) => (
              <div key={activity.id} className="d-flex justify-content-between align-items-center py-2 border-bottom" style={{ borderColor: 'rgba(255,215,0,0.1) !important' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: 'rgba(255,215,0,0.1)' }}>
                    <i className={`fas ${activity.icon}`} style={{ color: '#ffd700' }}></i>
                  </div>
                  <div>
                    <p className="fw-semibold mb-0" style={{ color: '#fff' }}>{activity.action}</p>
                    <small style={{ color: '#aaa' }}>{activity.date}</small>
                  </div>
                </div>
                <Badge bg={activity.status === 'completed' ? 'success' : 'warning'} className="rounded-pill">
                  {activity.status}
                </Badge>
              </div>
            ))}
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default Dashboard;