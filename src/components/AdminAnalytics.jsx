// src/components/AdminAnalytics.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const AdminAnalytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalNotifications: 0,
    activeUsers: 0
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const bookings = JSON.parse(localStorage.getItem('bookingRequests') || '[]');
    const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    
    setStats({
      totalUsers: users.length,
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === 'pending').length,
      confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
      totalNotifications: notifications.length,
      activeUsers: users.filter(u => u.createdAt && new Date(u.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000).length
    });
  };

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: 'fa-users', color: '#ffd700', bg: 'rgba(255,215,0,0.1)' },
    { title: 'Total Bookings', value: stats.totalBookings, icon: 'fa-calendar-check', color: '#4caf50', bg: 'rgba(76,175,80,0.1)' },
    { title: 'Pending Bookings', value: stats.pendingBookings, icon: 'fa-clock', color: '#ff9800', bg: 'rgba(255,152,0,0.1)' },
    { title: 'Confirmed Bookings', value: stats.confirmedBookings, icon: 'fa-check-circle', color: '#2196f3', bg: 'rgba(33,150,243,0.1)' },
    { title: 'Total Notifications', value: stats.totalNotifications, icon: 'fa-bell', color: '#9c27b0', bg: 'rgba(156,39,176,0.1)' },
    { title: 'Active Users (30d)', value: stats.activeUsers, icon: 'fa-user-check', color: '#ff6347', bg: 'rgba(255,99,71,0.1)' }
  ];

  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #05070a 0%, #0a0f1a 100%)', 
      minHeight: '100vh', 
      paddingTop: '100px',
      paddingBottom: '60px'
    }}>
      <Container>
        <div className="mb-4">
          <h1 className="display-5 fw-bold mb-2" style={{ color: '#fff' }}>
            <i className="fas fa-chart-line me-3" style={{ color: '#ffd700' }}></i>
            Analytics Dashboard
          </h1>
          <p style={{ color: '#aaa' }}>View platform statistics and insights</p>
        </div>

        <Row className="g-4 mb-4">
          {statCards.map((card, idx) => (
            <Col md={4} lg={4} key={idx}>
              <Card className="border-0 rounded-4 h-100" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', background: card.bg }}>
                      <i className={`fas ${card.icon} fa-2x`} style={{ color: card.color }}></i>
                    </div>
                    <span className="fs-1 fw-bold" style={{ color: card.color }}>{card.value}</span>
                  </div>
                  <h5 className="mb-0" style={{ color: '#fff' }}>{card.title}</h5>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="g-4">
          <Col md={6}>
            <Card className="border-0 rounded-4 h-100" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3" style={{ color: '#ffd700' }}>
                  <i className="fas fa-chart-pie me-2"></i> Booking Status
                </h4>
                <div className="mt-3">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Pending</span>
                      <span className="text-warning">{stats.pendingBookings}</span>
                    </div>
                    <div className="progress" style={{ height: '8px', background: 'rgba(255,255,255,0.1)' }}>
                      <div className="progress-bar bg-warning" style={{ width: `${stats.totalBookings ? (stats.pendingBookings / stats.totalBookings) * 100 : 0}%` }}></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Confirmed</span>
                      <span className="text-success">{stats.confirmedBookings}</span>
                    </div>
                    <div className="progress" style={{ height: '8px', background: 'rgba(255,255,255,0.1)' }}>
                      <div className="progress-bar bg-success" style={{ width: `${stats.totalBookings ? (stats.confirmedBookings / stats.totalBookings) * 100 : 0}%` }}></div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="border-0 rounded-4 h-100" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3" style={{ color: '#ffd700' }}>
                  <i className="fas fa-info-circle me-2"></i> Key Metrics
                </h4>
                <div className="mt-3">
                  <div className="mb-3">
                    <p className="mb-1"><strong>Conversion Rate:</strong></p>
                    <p className="fs-3 text-success">{stats.totalBookings ? Math.round((stats.confirmedBookings / stats.totalBookings) * 100) : 0}%</p>
                  </div>
                  <div className="mb-3">
                    <p className="mb-1"><strong>User Engagement:</strong></p>
                    <p className="fs-3 text-info">{stats.totalUsers ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}%</p>
                  </div>
                  <div className="mb-3">
                    <p className="mb-1"><strong>Avg Bookings/User:</strong></p>
                    <p className="fs-3 text-warning">{stats.totalUsers ? (stats.totalBookings / stats.totalUsers).toFixed(1) : 0}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <p className="small" style={{ color: '#666' }}>
            <i className="fas fa-sync-alt me-1"></i>
            Data updates automatically when users interact with the platform
          </p>
        </div>
      </Container>
    </section>
  );
};

export default AdminAnalytics;