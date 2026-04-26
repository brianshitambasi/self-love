// components/AdminNotifications.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Badge, Tabs, Tab } from 'react-bootstrap';
import { getAdminNotifications, markAdminNotificationAsRead, markAllAdminNotificationsAsRead, clearAdminNotifications, getUnreadAdminNotificationsCount, getAllBookingRequests, updateBookingStatus } from '../utils/adminNotifications';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('notifications');

  useEffect(() => {
    loadData();
    
    // Listen for storage changes
    window.addEventListener('storage', loadData);
    window.addEventListener('adminNotificationUpdate', loadData);
    
    return () => {
      window.removeEventListener('storage', loadData);
      window.removeEventListener('adminNotificationUpdate', loadData);
    };
  }, []);

  const loadData = () => {
    setNotifications(getAdminNotifications());
    setBookingRequests(getAllBookingRequests());
  };

  const markAsRead = (id) => {
    markAdminNotificationAsRead(id);
    loadData();
  };

  const markAllAsRead = () => {
    markAllAdminNotificationsAsRead();
    loadData();
  };

  const clearAll = () => {
    clearAdminNotifications();
    loadData();
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { text: 'Pending', variant: 'warning' },
      confirmed: { text: 'Confirmed', variant: 'success' },
      cancelled: { text: 'Cancelled', variant: 'danger' },
      completed: { text: 'Completed', variant: 'info' }
    };
    const config = statusConfig[status] || { text: status, variant: 'secondary' };
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #05070a 0%, #0a0f1a 100%)', 
      minHeight: '100vh', 
      paddingTop: '100px',
      paddingBottom: '60px'
    }}>
      <Container>
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h1 className="display-5 fw-bold mb-2" style={{ color: '#fff' }}>
                <i className="fas fa-bell me-3" style={{ color: '#ffd700' }}></i>
                Admin Dashboard
              </h1>
              <p style={{ color: '#aaa' }}>Manage booking requests and notifications</p>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex gap-2 border-bottom pb-2" style={{ borderColor: 'rgba(255,215,0,0.2) !important' }}>
            <button
              className={`btn ${activeTab === 'notifications' ? 'btn-warning' : 'btn-outline-warning'} rounded-pill px-4`}
              onClick={() => setActiveTab('notifications')}
            >
              <i className="fas fa-bell me-2"></i>Admin Notifications
              {unreadCount > 0 && (
                <Badge bg="danger" className="ms-2 rounded-pill">{unreadCount}</Badge>
              )}
            </button>
            <button
              className={`btn ${activeTab === 'bookings' ? 'btn-warning' : 'btn-outline-warning'} rounded-pill px-4`}
              onClick={() => setActiveTab('bookings')}
            >
              <i className="fas fa-calendar-check me-2"></i>Booking Requests
              {bookingRequests.filter(b => b.status === 'pending').length > 0 && (
                <Badge bg="danger" className="ms-2 rounded-pill">{bookingRequests.filter(b => b.status === 'pending').length}</Badge>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'notifications' && (
          <>
            <div className="mb-3 d-flex justify-content-end gap-2">
              {notifications.length > 0 && (
                <>
                  <Button variant="outline-warning" size="sm" onClick={markAllAsRead}>
                    <i className="fas fa-check-double me-1"></i> Mark All Read
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={clearAll}>
                    <i className="fas fa-trash-alt me-1"></i> Clear All
                  </Button>
                </>
              )}
            </div>

            {notifications.length === 0 ? (
              <Card className="border-0 rounded-4 text-center p-5" style={{ background: 'rgba(15, 20, 30, 0.85)' }}>
                <i className="fas fa-bell-slash fa-4x mb-3" style={{ color: '#aaa' }}></i>
                <h4 style={{ color: '#fff' }}>No admin notifications</h4>
                <p style={{ color: '#aaa' }}>When someone books a coffee chat, you'll see it here.</p>
              </Card>
            ) : (
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`border-0 rounded-4 mb-3 ${!notification.read ? 'unread' : ''}`}
                    style={{ 
                      background: !notification.read ? 'rgba(255,215,0,0.08)' : 'rgba(15, 20, 30, 0.7)',
                      border: `1px solid ${!notification.read ? 'rgba(255,215,0,0.3)' : 'rgba(255,215,0,0.1)'}`,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Card.Body className="p-4">
                      <div className="d-flex gap-3">
                        <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ 
                          width: '55px', 
                          height: '55px', 
                          background: `${notification.color}20`,
                          border: `2px solid ${notification.color}`
                        }}>
                          <i className={`fas ${notification.icon} fa-xl`} style={{ color: notification.color }}></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h5 className="fw-bold mb-1" style={{ color: '#ffd700' }}>
                                {notification.title}
                                {!notification.read && <Badge bg="warning" className="ms-2">New</Badge>}
                              </h5>
                              <p className="mb-2" style={{ color: '#aaa' }}>{notification.message}</p>
                              <small style={{ color: '#666' }}>
                                <i className="far fa-clock me-1"></i> {getTimeAgo(notification.date)}
                              </small>
                              {notification.bookingDetails && (
                                <div className="mt-2 pt-2 border-top" style={{ borderColor: 'rgba(255,215,0,0.2)' }}>
                                  <small style={{ color: '#ffd700' }}>
                                    <i className="fas fa-calendar-check me-1"></i>
                                    {notification.bookingDetails.name} - {new Date(notification.bookingDetails.date).toLocaleDateString()} at {notification.bookingDetails.time}
                                  </small>
                                </div>
                              )}
                            </div>
                            {!notification.read && (
                              <Button variant="link" size="sm" className="text-warning p-0" onClick={() => markAsRead(notification.id)}>
                                <i className="fas fa-check-circle fa-lg"></i>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'bookings' && (
          <>
            {bookingRequests.length === 0 ? (
              <Card className="border-0 rounded-4 text-center p-5" style={{ background: 'rgba(15, 20, 30, 0.85)' }}>
                <i className="fas fa-calendar-check fa-4x mb-3" style={{ color: '#aaa' }}></i>
                <h4 style={{ color: '#fff' }}>No booking requests</h4>
                <p style={{ color: '#aaa' }}>When someone books a coffee chat, you'll see it here.</p>
              </Card>
            ) : (
              <div className="booking-list">
                {bookingRequests.map((booking) => (
                  <Card key={booking.id} className="border-0 rounded-4 mb-3" style={{ background: 'rgba(15, 20, 30, 0.85)', border: '1px solid rgba(255,215,0,0.1)' }}>
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 className="fw-bold mb-1" style={{ color: '#ffd700' }}>
                            {booking.name}
                            {getStatusBadge(booking.status)}
                          </h5>
                          <p className="mb-1" style={{ color: '#aaa' }}>
                            <i className="fas fa-envelope me-2"></i>{booking.email}
                          </p>
                          <p className="mb-1" style={{ color: '#aaa' }}>
                            <i className="fas fa-phone me-2"></i>{booking.phone || 'Not provided'}
                          </p>
                          <p className="mb-1" style={{ color: '#ffd700' }}>
                            <i className="fas fa-calendar-alt me-2"></i>
                            {new Date(booking.date).toLocaleDateString()} at {booking.time}
                          </p>
                          <p className="mb-2" style={{ color: '#aaa' }}>
                            <i className="fas fa-video me-2"></i>{booking.meetingType === 'virtual' ? 'Virtual Meeting' : 'Phone Call'}
                          </p>
                          <small style={{ color: '#666' }}>
                            Booked: {getTimeAgo(booking.createdAt)}
                          </small>
                        </div>
                        {booking.status === 'pending' && (
                          <div className="d-flex gap-2">
                            <Button 
                              variant="success" 
                              size="sm" 
                              className="rounded-pill"
                              onClick={() => {
                                updateBookingStatus(booking.id, 'confirmed');
                                loadData();
                                alert(`Booking confirmed! ${booking.name} has been notified.`);
                              }}
                            >
                              <i className="fas fa-check me-1"></i> Confirm
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm" 
                              className="rounded-pill"
                              onClick={() => {
                                if (window.confirm(`Cancel booking with ${booking.name}?`)) {
                                  updateBookingStatus(booking.id, 'cancelled');
                                  loadData();
                                }
                              }}
                            >
                              <i className="fas fa-times me-1"></i> Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </Container>

      <style>{`
        .unread {
          background: linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,100,50,0.05));
        }
        .notification-card:hover, .booking-list .card:hover {
          transform: translateX(5px);
          border-color: rgba(255,215,0,0.4) !important;
        }
      `}</style>
    </section>
  );
};

export default AdminNotifications;