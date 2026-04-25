// components/Notifications.jsx - Updated to load real notifications
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Badge } from 'react-bootstrap';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  // Load notifications from localStorage on mount
  useEffect(() => {
    loadNotifications();
    
    // Listen for storage changes (in case notifications are added in another tab)
    window.addEventListener('storage', loadNotifications);
    
    // Listen for custom notification update event
    window.addEventListener('notificationUpdate', () => loadNotifications());
    
    return () => {
      window.removeEventListener('storage', loadNotifications);
      window.removeEventListener('notificationUpdate', () => loadNotifications());
    };
  }, []);

  const loadNotifications = () => {
    const storedNotifications = localStorage.getItem('userNotifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      // Add default welcome notification if no notifications exist
      const defaultNotifications = [
        {
          id: Date.now(),
          type: 'welcome',
          title: 'Welcome to Apex Legacy! 🎉',
          message: 'Thank you for joining our community. Schedule your first coffee chat to get started!',
          date: new Date().toISOString(),
          read: false,
          icon: 'fa-gem',
          color: '#ffd700',
          actionLink: '/'
        }
      ];
      localStorage.setItem('userNotifications', JSON.stringify(defaultNotifications));
      setNotifications(defaultNotifications);
    }
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
    
    // Update notification count
    const unreadCount = updatedNotifications.filter(n => !n.read).length;
    localStorage.setItem('notificationCount', unreadCount);
    window.dispatchEvent(new CustomEvent('notificationUpdate', { detail: unreadCount }));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
    
    // Update notification count
    localStorage.setItem('notificationCount', 0);
    window.dispatchEvent(new CustomEvent('notificationUpdate', { detail: 0 }));
  };

  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
    
    // Update notification count
    const unreadCount = updatedNotifications.filter(n => !n.read).length;
    localStorage.setItem('notificationCount', unreadCount);
    window.dispatchEvent(new CustomEvent('notificationUpdate', { detail: unreadCount }));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem('userNotifications', JSON.stringify([]));
    localStorage.setItem('notificationCount', 0);
    window.dispatchEvent(new CustomEvent('notificationUpdate', { detail: 0 }));
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getFilteredNotifications = () => {
    switch(activeTab) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'read':
        return notifications.filter(n => n.read);
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
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

  // Get notification color based on type
  const getNotificationColor = (type) => {
    const colors = {
      booking: '#ffd700',
      webinar: '#ff6347',
      achievement: '#4caf50',
      update: '#ffd700',
      reminder: '#2196f3',
      welcome: '#ffd700'
    };
    return colors[type] || '#ffd700';
  };

  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #05070a 0%, #0a0f1a 100%)', 
      minHeight: '100vh', 
      paddingTop: '100px',
      paddingBottom: '60px'
    }}>
      <Container>
        {/* Header */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h1 className="display-5 fw-bold mb-2" style={{ color: '#fff' }}>
                <i className="fas fa-bell me-3" style={{ color: '#ffd700' }}></i>
                Notifications
              </h1>
              <p style={{ color: '#aaa' }}>Stay updated with your latest activities and announcements</p>
            </div>
            <div className="d-flex gap-2">
              {notifications.length > 0 && (
                <>
                  <Button 
                    variant="outline-warning" 
                    className="rounded-pill"
                    onClick={markAllAsRead}
                  >
                    <i className="fas fa-check-double me-2"></i>Mark All Read
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    className="rounded-pill"
                    onClick={clearAll}
                  >
                    <i className="fas fa-trash-alt me-2"></i>Clear All
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <Card className="border-0 rounded-4 text-center" style={{ background: 'rgba(15, 20, 30, 0.85)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <Card.Body className="p-3">
                <i className="fas fa-bell fa-2x mb-2" style={{ color: '#ffd700' }}></i>
                <h3 className="fw-bold mb-0" style={{ color: '#ffd700' }}>{notifications.length}</h3>
                <small style={{ color: '#aaa' }}>Total Notifications</small>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="border-0 rounded-4 text-center" style={{ background: 'rgba(15, 20, 30, 0.85)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <Card.Body className="p-3">
                <i className="fas fa-envelope fa-2x mb-2" style={{ color: '#ff6347' }}></i>
                <h3 className="fw-bold mb-0" style={{ color: '#ff6347' }}>{unreadCount}</h3>
                <small style={{ color: '#aaa' }}>Unread</small>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="border-0 rounded-4 text-center" style={{ background: 'rgba(15, 20, 30, 0.85)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <Card.Body className="p-3">
                <i className="fas fa-check-circle fa-2x mb-2" style={{ color: '#4caf50' }}></i>
                <h3 className="fw-bold mb-0" style={{ color: '#4caf50' }}>{notifications.filter(n => n.read).length}</h3>
                <small style={{ color: '#aaa' }}>Read</small>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-3">
          <div className="d-flex gap-2 border-bottom pb-2" style={{ borderColor: 'rgba(255,215,0,0.2) !important' }}>
            <button
              className={`btn ${activeTab === 'all' ? 'btn-warning' : 'btn-outline-warning'} rounded-pill px-4`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              className={`btn ${activeTab === 'unread' ? 'btn-warning' : 'btn-outline-warning'} rounded-pill px-4`}
              onClick={() => setActiveTab('unread')}
            >
              Unread
              {unreadCount > 0 && (
                <Badge bg="danger" className="ms-2 rounded-pill">{unreadCount}</Badge>
              )}
            </button>
            <button
              className={`btn ${activeTab === 'read' ? 'btn-warning' : 'btn-outline-warning'} rounded-pill px-4`}
              onClick={() => setActiveTab('read')}
            >
              Read
            </button>
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <Card className="border-0 rounded-4 text-center p-5" style={{ background: 'rgba(15, 20, 30, 0.85)', border: '1px solid rgba(255,215,0,0.2)' }}>
            <i className="fas fa-bell-slash fa-4x mb-3" style={{ color: '#aaa' }}></i>
            <h4 style={{ color: '#fff' }}>No notifications</h4>
            <p style={{ color: '#aaa' }}>You're all caught up! Schedule a coffee chat to get started.</p>
            <Button 
              variant="warning" 
              className="rounded-pill mt-3 mx-auto"
              style={{ maxWidth: '200px' }}
              onClick={() => window.location.href = '/'}
            >
              <i className="fas fa-coffee me-2"></i> Schedule Coffee Chat
            </Button>
          </Card>
        ) : (
          <div className="notifications-list">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`border-0 rounded-4 mb-3 notification-card ${!notification.read ? 'unread' : ''}`}
                style={{ 
                  background: !notification.read ? 'rgba(255,215,0,0.05)' : 'rgba(15, 20, 30, 0.7)',
                  border: `1px solid ${!notification.read ? 'rgba(255,215,0,0.3)' : 'rgba(255,215,0,0.1)'}`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  markAsRead(notification.id);
                  if (notification.actionLink) {
                    window.location.href = notification.actionLink;
                  }
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ 
                        width: '55px', 
                        height: '55px', 
                        background: `${notification.color || getNotificationColor(notification.type)}20`,
                        border: `2px solid ${notification.color || getNotificationColor(notification.type)}`
                      }}>
                        <i className={`fas ${notification.icon || getNotificationIcon(notification.type)} fa-xl`} style={{ color: notification.color || getNotificationColor(notification.type) }}></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                        <div>
                          <h5 className="fw-bold mb-1" style={{ color: '#fff' }}>
                            {notification.title}
                            {!notification.read && (
                              <Badge bg="warning" className="ms-2 rounded-pill" style={{ color: '#1a1a2e' }}>New</Badge>
                            )}
                          </h5>
                          <p className="mb-2" style={{ color: '#aaa' }}>{notification.message}</p>
                          <small style={{ color: '#666' }}>
                            <i className="far fa-clock me-1"></i> {getTimeAgo(notification.date)}
                          </small>
                        </div>
                        <div className="d-flex gap-2">
                          {!notification.read && (
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="text-warning p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                            >
                              <i className="fas fa-check-circle"></i>
                            </Button>
                          )}
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="text-danger p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                        </div>
                      </div>
                      {/* Show booking details if available */}
                      {notification.bookingDetails && (
                        <div className="mt-2 pt-2 border-top" style={{ borderColor: 'rgba(255,215,0,0.1)' }}>
                          <small style={{ color: '#ffd700' }}>
                            <i className="fas fa-calendar-check me-1"></i> 
                            {new Date(notification.bookingDetails.date).toLocaleDateString()} at {notification.bookingDetails.time}
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-4">
          <p className="small" style={{ color: '#666' }}>
            <i className="fas fa-lock me-1"></i> Your notifications are private and secure
          </p>
        </div>
      </Container>

      <style>{`
        .notification-card {
          transition: all 0.3s ease;
        }
        .notification-card:hover {
          transform: translateX(5px);
          border-color: rgba(255, 215, 0, 0.4) !important;
          box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        }
        .notification-card.unread {
          background: linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,100,50,0.05));
        }
      `}</style>
    </section>
  );
};

export default Notifications;