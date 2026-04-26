// components/MemberBenefits.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';

const MemberBenefits = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    memberSince: '',
    bookingsCount: 0,
    webinarsAttended: 0,
    profileComplete: 0,
    referrals: 0,
    rank: 'Bronze'
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userName = currentUser.name || localStorage.getItem('userName') || 'Member';
    const userEmail = currentUser.email || localStorage.getItem('userEmail') || '';
    
    // Get user's bookings
    const userBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const bookingRequests = JSON.parse(localStorage.getItem('bookingRequests') || '[]');
    
    // Filter bookings for this user
    const userSpecificBookings = bookingRequests.filter(b => b.email === userEmail);
    const totalBookings = userBookings.length + userSpecificBookings.length;
    
    // Get completed webinars
    const completedWebinars = JSON.parse(localStorage.getItem('completedWebinars') || '[]');
    const userWebinars = completedWebinars.filter(w => w.userEmail === userEmail);
    
    // Calculate profile completion
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    let profileComplete = 0;
    if (profile.fullName) profileComplete += 20;
    if (profile.email) profileComplete += 20;
    if (profile.phone) profileComplete += 20;
    if (profile.location) profileComplete += 20;
    if (profile.bio) profileComplete += 20;
    
    // Determine rank based on bookings
    let rank = 'Bronze';
    if (totalBookings >= 20) rank = 'Diamond';
    else if (totalBookings >= 10) rank = 'Gold';
    else if (totalBookings >= 5) rank = 'Silver';
    
    setUserData({
      name: userName,
      email: userEmail,
      memberSince: new Date().toLocaleDateString(),
      bookingsCount: totalBookings,
      webinarsAttended: userWebinars.length,
      profileComplete: profileComplete,
      referrals: userSpecificBookings.filter(b => b.referral === userName).length,
      rank: rank
    });
    
    setLoading(false);
  };

  const benefits = [
    {
      icon: 'fas fa-chart-line',
      title: 'Exclusive Content',
      description: 'Access premium training materials and strategies',
      requiredRank: 'Bronze',
      color: '#cd7f32'
    },
    {
      icon: 'fas fa-users',
      title: 'Private Community',
      description: 'Connect with like-minded entrepreneurs',
      requiredRank: 'Bronze',
      color: '#cd7f32'
    },
    {
      icon: 'fas fa-video',
      title: 'Weekly Webinars',
      description: 'Live training sessions with industry experts',
      requiredRank: 'Silver',
      color: '#c0c0c0'
    },
    {
      icon: 'fas fa-robot',
      title: 'AI Assistant Access',
      description: '24/7 BrianBot support for your questions',
      requiredRank: 'Silver',
      color: '#c0c0c0'
    },
    {
      icon: 'fas fa-crown',
      title: 'One-on-One Coaching',
      description: 'Personal strategy sessions with Brian',
      requiredRank: 'Gold',
      color: '#ffd700'
    },
    {
      icon: 'fas fa-gem',
      title: 'Diamond Mentorship',
      description: 'Exclusive diamond-level training and resources',
      requiredRank: 'Diamond',
      color: '#00bcd4'
    }
  ];

  const rankColors = {
    Bronze: '#cd7f32',
    Silver: '#c0c0c0',
    Gold: '#ffd700',
    Diamond: '#00bcd4'
  };

  const nextRank = () => {
    const ranks = ['Bronze', 'Silver', 'Gold', 'Diamond'];
    const currentIndex = ranks.indexOf(userData.rank);
    if (currentIndex < ranks.length - 1) {
      return ranks[currentIndex + 1];
    }
    return null;
  };

  const bookingsNeeded = () => {
    if (userData.rank === 'Bronze') return 5 - userData.bookingsCount;
    if (userData.rank === 'Silver') return 10 - userData.bookingsCount;
    if (userData.rank === 'Gold') return 20 - userData.bookingsCount;
    return 0;
  };

  const progressPercentage = () => {
    if (userData.rank === 'Bronze') return (userData.bookingsCount / 5) * 100;
    if (userData.rank === 'Silver') return (userData.bookingsCount / 10) * 100;
    if (userData.rank === 'Gold') return (userData.bookingsCount / 20) * 100;
    return 100;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <i className="fas fa-spinner fa-spin fa-2x" style={{ color: '#ffd700' }}></i>
        <p style={{ color: '#aaa', marginTop: '0.5rem' }}>Loading your benefits...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(76,175,80,0.05))',
      borderRadius: '2rem',
      padding: '1.5rem',
      marginTop: '1rem',
      marginBottom: '1rem',
      border: '1px solid rgba(255,215,0,0.2)'
    }}>
      {/* Welcome Header with Rank */}
      <div className="text-center mb-4">
        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
          <i className="fas fa-star-of-life" style={{ color: rankColors[userData.rank], fontSize: '1.5rem' }}></i>
          <h3 style={{ color: '#ffd700', fontWeight: 'bold', margin: 0 }}>Member Benefits</h3>
          <i className="fas fa-star-of-life" style={{ color: rankColors[userData.rank], fontSize: '1.5rem' }}></i>
        </div>
        <p style={{ color: '#aaa', marginBottom: '0.5rem' }}>Welcome, <strong style={{ color: '#ffd700' }}>{userData.name}</strong>!</p>
        <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Access exclusive content, track your progress, and get personalized mentorship.</p>
      </div>

      {/* Stats Row */}
      <Row className="g-3 mb-4">
        <Col xs={6} md={3}>
          <div className="text-center p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <i className="fas fa-calendar-check" style={{ color: '#ffd700' }}></i>
            <h4 className="mb-0" style={{ color: '#ffd700' }}>{userData.bookingsCount}</h4>
            <small style={{ color: '#aaa' }}>Bookings</small>
          </div>
        </Col>
        <Col xs={6} md={3}>
          <div className="text-center p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <i className="fas fa-video" style={{ color: '#ffd700' }}></i>
            <h4 className="mb-0" style={{ color: '#ffd700' }}>{userData.webinarsAttended}</h4>
            <small style={{ color: '#aaa' }}>Webinars</small>
          </div>
        </Col>
        <Col xs={6} md={3}>
          <div className="text-center p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <i className="fas fa-chart-simple" style={{ color: '#ffd700' }}></i>
            <h4 className="mb-0" style={{ color: '#ffd700' }}>{userData.profileComplete}%</h4>
            <small style={{ color: '#aaa' }}>Profile</small>
          </div>
        </Col>
        <Col xs={6} md={3}>
          <div className="text-center p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <i className="fas fa-trophy" style={{ color: rankColors[userData.rank] }}></i>
            <h4 className="mb-0" style={{ color: rankColors[userData.rank] }}>{userData.rank}</h4>
            <small style={{ color: '#aaa' }}>Rank</small>
          </div>
        </Col>
      </Row>

      {/* Progress to Next Rank */}
      {nextRank() && (
        <div className="mb-4 p-3 rounded-3" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="d-flex justify-content-between mb-2">
            <span style={{ color: '#aaa' }}>
              <i className="fas fa-arrow-up me-1" style={{ color: '#ffd700' }}></i>
              Progress to <strong style={{ color: rankColors[nextRank()] }}>{nextRank()}</strong>
            </span>
            <span style={{ color: '#ffd700' }}>{Math.min(100, Math.round(progressPercentage()))}%</span>
          </div>
          <ProgressBar 
            now={Math.min(100, progressPercentage())} 
            variant="warning" 
            style={{ height: '8px', borderRadius: '4px' }}
          />
          <p className="small mt-2 mb-0" style={{ color: '#666' }}>
            {bookingsNeeded() > 0 ? (
              <>📅 {bookingsNeeded()} more {bookingsNeeded() === 1 ? 'booking' : 'bookings'} to reach {nextRank()} rank!</>
            ) : (
              <>🎉 Congratulations! You've reached {userData.rank} rank!</>
            )}
          </p>
        </div>
      )}

      {/* Benefits Grid */}
      <h5 className="fw-bold mb-3" style={{ color: '#ffd700', fontSize: '0.9rem' }}>
        <i className="fas fa-gift me-2"></i>Your Benefits
      </h5>
      <Row className="g-2 mb-4">
        {benefits.map((benefit, idx) => {
          const isUnlocked = 
            benefit.requiredRank === 'Bronze' ||
            (benefit.requiredRank === 'Silver' && (userData.rank === 'Silver' || userData.rank === 'Gold' || userData.rank === 'Diamond')) ||
            (benefit.requiredRank === 'Gold' && (userData.rank === 'Gold' || userData.rank === 'Diamond')) ||
            (benefit.requiredRank === 'Diamond' && userData.rank === 'Diamond');
          
          return (
            <Col md={6} lg={4} key={idx}>
              <div className="p-2 rounded-3" style={{ 
                background: isUnlocked ? 'rgba(255,215,0,0.1)' : 'rgba(0,0,0,0.2)',
                borderLeft: isUnlocked ? `3px solid ${benefit.color}` : '3px solid rgba(255,255,255,0.1)',
                opacity: isUnlocked ? 1 : 0.6
              }}>
                <div className="d-flex align-items-center gap-2">
                  <i className={`${benefit.icon}`} style={{ color: benefit.color, fontSize: '1rem', width: '24px' }}></i>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <span style={{ color: '#fff', fontSize: '0.85rem' }}>{benefit.title}</span>
                      {isUnlocked ? (
                        <i className="fas fa-check-circle" style={{ color: '#4caf50', fontSize: '0.7rem' }}></i>
                      ) : (
                        <i className="fas fa-lock" style={{ color: '#666', fontSize: '0.7rem' }}></i>
                      )}
                    </div>
                    <small style={{ color: '#aaa', fontSize: '0.7rem' }}>{benefit.description}</small>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>

      {/* Quick Actions */}
      <div className="text-center">
        <Button 
          variant="warning" 
          size="sm"
          className="rounded-pill px-3 me-2"
          onClick={() => window.location.href = '/dashboard'}
        >
          <i className="fas fa-tachometer-alt me-1"></i>Dashboard
        </Button>
        <Button 
          variant="outline-warning" 
          size="sm"
          className="rounded-pill px-3"
          onClick={() => window.location.href = '/'}
        >
          <i className="fas fa-coffee me-1"></i>Book Coffee Chat
        </Button>
      </div>
    </div>
  );
};

export default MemberBenefits;