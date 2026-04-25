// components/Dashboard.jsx - Real data only (no fake data)
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Badge } from 'react-bootstrap';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedWebinars: 0,
    upcomingEvents: 0,
    coffeeChats: 0,
    totalEarnings: 0,
    referrals: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [progress, setProgress] = useState({
    profileComplete: 0,
    webinarAttendance: 0,
    goalAchievement: 0
  });
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    setIsLoading(true);
    
    // Load user name from profile
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const profileData = JSON.parse(profile);
      if (profileData.fullName) {
        setUserName(profileData.fullName.split(' ')[0]); // Get first name only
      }
    }
    
    // If no profile name, check login name
    if (!userName) {
      const savedName = localStorage.getItem('userName');
      if (savedName) {
        setUserName(savedName);
      }
    }
    
    // Load bookings from localStorage
    const savedBookings = localStorage.getItem('userBookings');
    let bookings = [];
    if (savedBookings) {
      bookings = JSON.parse(savedBookings);
      const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
      const coffeeBookings = bookings.filter(b => b.type === 'Coffee Chat' || b.meetingType === 'Virtual' || b.meetingType === 'Phone Call');
      
      setStats(prev => ({
        ...prev,
        totalBookings: bookings.length,
        upcomingEvents: upcomingBookings.length,
        coffeeChats: coffeeBookings.length
      }));
    }

    // Load notifications for recent activity
    const savedNotifications = localStorage.getItem('userNotifications');
    let notifications = [];
    if (savedNotifications) {
      notifications = JSON.parse(savedNotifications);
      setRecentNotifications(notifications.slice(0, 3));
      
      // Convert notifications to activities
      const activities = notifications.slice(0, 4).map(notif => ({
        id: notif.id,
        action: notif.title,
        date: new Date(notif.date).toLocaleDateString(),
        status: notif.read ? 'completed' : 'pending',
        icon: notif.icon || getIconForType(notif.type)
      }));
      setRecentActivities(activities);
    }

    // Load webinar attendance from localStorage
    const savedWebinars = localStorage.getItem('userWebinars');
    if (savedWebinars) {
      const webinars = JSON.parse(savedWebinars);
      const completed = webinars.filter(w => w.completed).length;
      setStats(prev => ({ ...prev, completedWebinars: completed }));
    }

    // Calculate profile completion based on saved data
    let profileComplete = 0;
    if (profile) {
      const profileData = JSON.parse(profile);
      let completed = 0;
      if (profileData.fullName && profileData.fullName !== '') completed += 20;
      if (profileData.email && profileData.email !== '') completed += 20;
      if (profileData.phone && profileData.phone !== '') completed += 20;
      if (profileData.location && profileData.location !== '') completed += 20;
      if (profileData.bio && profileData.bio !== '') completed += 20;
      profileComplete = completed;
    }
    
    // Calculate webinar attendance
    const webinarsAttended = stats.completedWebinars;
    const targetWebinars = 5;
    const webinarAttendance = webinarsAttended > 0 ? Math.min(Math.round((webinarsAttended / targetWebinars) * 100), 100) : 0;
    
    // Calculate goal achievement based on completed actions
    const totalActions = bookings.length + (stats.completedWebinars || 0);
    const targetActions = 20;
    const goalAchievement = totalActions > 0 ? Math.min(Math.round((totalActions / targetActions) * 100), 100) : 0;
    
    setProgress({
      profileComplete,
      webinarAttendance,
      goalAchievement
    });
    
    setIsLoading(false);
  };

  const getIconForType = (type) => {
    const icons = {
      booking: 'fa-coffee',
      webinar: 'fa-video',
      achievement: 'fa-trophy',
      update: 'fa-gem',
      reminder: 'fa-clock',
      welcome: 'fa-hand-peace'
    };
    return icons[type] || 'fa-bell';
  };

  if (isLoading) {
    return (
      <section style={{ 
        background: 'linear-gradient(135deg, #05070a 0%, #0a0f1a 100%)', 
        minHeight: '100vh', 
        paddingTop: '100px',
        paddingBottom: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <i className="fas fa-spinner fa-spin fa-3x" style={{ color: '#ffd700' }}></i>
          <p style={{ color: '#aaa', marginTop: '1rem' }}>Loading your dashboard...</p>
        </div>
      </section>
    );
  }

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
            Welcome back, <span style={{ color: '#ffd700' }}>{userName || 'Guest'}!</span>
          </h1>
          <p style={{ color: '#aaa' }}>Here's your real-time dashboard with your actual activity.</p>
        </div>

        {/* Stats Cards - Only show if there's data */}
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
                  <i className="fas fa-calendar-alt fa-2x" style={{ color: '#2196f3' }}></i>
                </div>
                <h2 className="fw-bold mb-0" style={{ color: '#2196f3' }}>{stats.upcomingEvents}</h2>
                <p style={{ color: '#aaa' }}>Upcoming Events</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Progress Section - Only show if there's actual progress */}
        {(progress.profileComplete > 0 || progress.webinarAttendance > 0 || progress.goalAchievement > 0) && (
          <Row className="g-4 mb-4">
            <Col lg={6}>
              <Card className="border-0 rounded-4" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-3" style={{ color: '#ffd700' }}>
                    <i className="fas fa-chart-line me-2"></i> Your Progress
                  </h4>
                  {progress.profileComplete > 0 && (
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ color: '#fff' }}>Profile Completion</span>
                        <span style={{ color: '#ffd700' }}>{progress.profileComplete}%</span>
                      </div>
                      <ProgressBar now={progress.profileComplete} variant="warning" style={{ height: '8px', borderRadius: '4px' }} />
                    </div>
                  )}
                  {progress.webinarAttendance > 0 && (
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ color: '#fff' }}>Webinar Attendance</span>
                        <span style={{ color: '#ff6347' }}>{progress.webinarAttendance}%</span>
                      </div>
                      <ProgressBar now={progress.webinarAttendance} variant="danger" style={{ height: '8px', borderRadius: '4px' }} />
                    </div>
                  )}
                  {progress.goalAchievement > 0 && (
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ color: '#fff' }}>Goal Achievement</span>
                        <span style={{ color: '#4caf50' }}>{progress.goalAchievement}%</span>
                      </div>
                      <ProgressBar now={progress.goalAchievement} variant="success" style={{ height: '8px', borderRadius: '4px' }} />
                    </div>
                  )}
                  {progress.profileComplete === 0 && progress.webinarAttendance === 0 && progress.goalAchievement === 0 && (
                    <p style={{ color: '#aaa' }}>Complete your profile and activities to see your progress here.</p>
                  )}
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
                    <Button variant="warning" className="rounded-pill" onClick={() => window.location.href = '/'}>
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
        )}

        {/* Recent Notifications - Only show if there are real notifications */}
        {recentNotifications.length > 0 && (
          <Card className="border-0 rounded-4 mb-4" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-3" style={{ color: '#ffd700' }}>
                <i className="fas fa-bell me-2"></i> Recent Notifications
              </h4>
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="d-flex align-items-center gap-3 py-2 border-bottom" style={{ borderColor: 'rgba(255,215,0,0.1)' }}>
                  <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: `${notification.color || '#ffd700'}20` }}>
                    <i className={`fas ${notification.icon || 'fa-bell'}`} style={{ color: notification.color || '#ffd700' }}></i>
                  </div>
                  <div className="flex-grow-1">
                    <p className="fw-semibold mb-0" style={{ color: '#fff' }}>{notification.title}</p>
                    <small style={{ color: '#aaa' }}>{new Date(notification.date).toLocaleDateString()}</small>
                  </div>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-warning p-0"
                    onClick={() => window.location.href = notification.actionLink || '/notifications'}
                  >
                    View →
                  </Button>
                </div>
              ))}
            </Card.Body>
          </Card>
        )}

        {/* Recent Activity - Only show if there are real activities */}
        {recentActivities.length > 0 ? (
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
                    {activity.status === 'completed' ? 'Completed' : 'Pending'}
                  </Badge>
                </div>
              ))}
            </Card.Body>
          </Card>
        ) : (
          <Card className="border-0 rounded-4" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
            <Card.Body className="p-4 text-center">
              <i className="fas fa-inbox fa-3x mb-3" style={{ color: '#666' }}></i>
              <h4 style={{ color: '#fff' }}>No Activity Yet</h4>
              <p style={{ color: '#aaa' }}>Start by scheduling a coffee chat or joining a webinar!</p>
              <Button variant="warning" className="rounded-pill mt-2" onClick={() => window.location.href = '/'}>
                <i className="fas fa-coffee me-2"></i> Schedule Your First Coffee Chat
              </Button>
            </Card.Body>
          </Card>
        )}
      </Container>
    </section>
  );
};

export default Dashboard;