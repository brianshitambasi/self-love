// components/Bookings.jsx - Updated with real data from localStorage
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    setLoading(true);
    
    // Load user's own bookings from localStorage
    const savedBookings = localStorage.getItem('userBookings');
    let userBookings = savedBookings ? JSON.parse(savedBookings) : [];
    
    // Also load booking requests (admin approved ones)
    const allBookingRequests = localStorage.getItem('bookingRequests');
    let allBookings = allBookingRequests ? JSON.parse(allBookingRequests) : [];
    
    // Get current user email
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userEmail = currentUser.email || localStorage.getItem('userEmail');
    
    // Filter bookings for current user
    const userSpecificBookings = allBookings.filter(booking => 
      booking.email === userEmail
    );
    
    // Combine and format bookings
    const formattedUserBookings = userBookings.map(booking => ({
      ...booking,
      type: 'Coffee Chat',
      icon: 'fa-coffee',
      color: booking.status === 'completed' ? '#4caf50' : '#ffd700',
      with: 'Brian Shitambasi',
      status: booking.status || 'upcoming'
    }));
    
    const formattedRequestBookings = userSpecificBookings.map(booking => ({
      id: booking.id,
      type: 'Coffee Chat',
      date: new Date(booking.date).toLocaleDateString(),
      time: booking.time,
      status: booking.status || 'pending',
      icon: 'fa-coffee',
      color: booking.status === 'confirmed' ? '#4caf50' : booking.status === 'cancelled' ? '#f44336' : '#ffd700',
      with: 'Brian Shitambasi',
      meetingType: booking.meetingType === 'virtual' ? 'Virtual' : 'Phone Call',
      name: booking.name,
      email: booking.email,
      phone: booking.phone
    }));
    
    // Combine all bookings and sort by date
    const allCombined = [...formattedUserBookings, ...formattedRequestBookings];
    const sortedBookings = allCombined.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    setBookings(sortedBookings);
    setLoading(false);
  };

  const handleCancelBooking = () => {
    // Remove from userBookings
    const savedBookings = localStorage.getItem('userBookings');
    let userBookings = savedBookings ? JSON.parse(savedBookings) : [];
    const updatedBookings = userBookings.filter(b => b.id !== selectedBooking.id);
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    
    // Also update booking requests status
    const allBookingRequests = localStorage.getItem('bookingRequests');
    if (allBookingRequests) {
      let requests = JSON.parse(allBookingRequests);
      const updatedRequests = requests.map(req => 
        req.id === selectedBooking.id ? { ...req, status: 'cancelled' } : req
      );
      localStorage.setItem('bookingRequests', JSON.stringify(updatedRequests));
    }
    
    loadBookings();
    setShowCancelModal(false);
    alert('❌ Booking cancelled successfully!');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'upcoming':
        return <Badge bg="warning" className="rounded-pill">⏳ Upcoming</Badge>;
      case 'confirmed':
        return <Badge bg="success" className="rounded-pill">✅ Confirmed</Badge>;
      case 'completed':
        return <Badge bg="success" className="rounded-pill">✓ Completed</Badge>;
      case 'cancelled':
        return <Badge bg="danger" className="rounded-pill">✗ Cancelled</Badge>;
      case 'pending':
        return <Badge bg="info" className="rounded-pill">⏰ Pending Approval</Badge>;
      default:
        return <Badge bg="secondary" className="rounded-pill">{status}</Badge>;
    }
  };

  const upcomingBookings = bookings.filter(b => 
    b.status === 'upcoming' || b.status === 'confirmed' || b.status === 'pending'
  );
  const pastBookings = bookings.filter(b => 
    b.status === 'completed' || b.status === 'cancelled'
  );

  if (loading) {
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
          <p style={{ color: '#aaa', marginTop: '1rem' }}>Loading your bookings...</p>
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
        <div className="mb-4">
          <h1 className="display-5 fw-bold mb-2" style={{ color: '#fff' }}>
            My <span style={{ color: '#ffd700' }}>Bookings</span>
          </h1>
          <p style={{ color: '#aaa' }}>Manage your coffee chats and webinar registrations.</p>
        </div>

        {/* Upcoming Bookings */}
        <div className="mb-5">
          <h3 className="fw-bold mb-3" style={{ color: '#ffd700' }}>
            <i className="fas fa-calendar-alt me-2"></i> Upcoming ({upcomingBookings.length})
          </h3>
          {upcomingBookings.length === 0 ? (
            <Card className="border-0 rounded-4 text-center p-5" style={{ background: 'rgba(15, 20, 30, 0.85)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <i className="fas fa-calendar-check fa-4x mb-3" style={{ color: '#ffd700' }}></i>
              <h4 style={{ color: '#fff' }}>No upcoming bookings</h4>
              <p style={{ color: '#aaa' }}>Schedule a coffee chat or webinar to get started!</p>
              <Button variant="warning" className="rounded-pill mx-auto" style={{ maxWidth: '200px' }} onClick={() => window.location.href = '/'}>
                <i className="fas fa-plus me-2"></i> Book Now
              </Button>
            </Card>
          ) : (
            <Row>
              {upcomingBookings.map((booking) => (
                <Col md={6} lg={4} key={booking.id} className="mb-4">
                  <Card className="border-0 rounded-4 h-100" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', background: `${booking.color}20` }}>
                          <i className={`fas ${booking.icon} fa-2x`} style={{ color: booking.color }}></i>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                      <h4 className="fw-bold mb-2" style={{ color: '#fff' }}>{booking.type}</h4>
                      <p className="mb-1" style={{ color: '#aaa' }}>
                        <i className="fas fa-user me-2" style={{ color: '#ffd700' }}></i>
                        with {booking.with}
                      </p>
                      <p className="mb-1" style={{ color: '#aaa' }}>
                        <i className="fas fa-calendar-day me-2" style={{ color: '#ffd700' }}></i>
                        {booking.date} at {booking.time}
                      </p>
                      <p className="mb-3" style={{ color: '#aaa' }}>
                        <i className="fas fa-video me-2" style={{ color: '#ffd700' }}></i>
                        {booking.meetingType}
                      </p>
                      <div className="d-flex gap-2">
                        <Button variant="warning" size="sm" className="rounded-pill flex-grow-1">
                          <i className="fas fa-edit me-1"></i> Reschedule
                        </Button>
                        {booking.status !== 'cancelled' && (
                          <Button variant="outline-danger" size="sm" className="rounded-pill flex-grow-1" onClick={() => {
                            setSelectedBooking(booking);
                            setShowCancelModal(true);
                          }}>
                            <i className="fas fa-times me-1"></i> Cancel
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <div>
            <h3 className="fw-bold mb-3" style={{ color: '#aaa' }}>
              <i className="fas fa-history me-2"></i> Past ({pastBookings.length})
            </h3>
            <Row>
              {pastBookings.map((booking) => (
                <Col md={6} lg={4} key={booking.id} className="mb-4">
                  <Card className="border-0 rounded-4 h-100 opacity-75" style={{ background: 'rgba(15, 20, 30, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.1)' }}>
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', background: `${booking.color}20` }}>
                          <i className={`fas ${booking.icon} fa-2x`} style={{ color: booking.color }}></i>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                      <h4 className="fw-bold mb-2" style={{ color: '#fff' }}>{booking.type}</h4>
                      <p className="mb-1" style={{ color: '#aaa' }}>
                        <i className="fas fa-user me-2" style={{ color: '#ffd700' }}></i>
                        with {booking.with}
                      </p>
                      <p className="mb-3" style={{ color: '#aaa' }}>
                        <i className="fas fa-calendar-day me-2" style={{ color: '#ffd700' }}></i>
                        {booking.date} at {booking.time}
                      </p>
                      <Button variant="outline-warning" size="sm" className="rounded-pill w-100">
                        <i className="fas fa-book-open me-1"></i> View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>

      {/* Cancel Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton style={{ background: '#1a1a2e', borderBottom: '1px solid rgba(255,215,0,0.2)' }}>
          <Modal.Title style={{ color: '#ffd700' }}>Cancel Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1a1a2e', color: '#fff' }}>
          Are you sure you want to cancel your {selectedBooking?.type} on {selectedBooking?.date} at {selectedBooking?.time}?
          <p className="mt-2 small" style={{ color: '#ff6347' }}>This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer style={{ background: '#1a1a2e', borderTop: '1px solid rgba(255,215,0,0.2)' }}>
          <Button variant="secondary" className="rounded-pill" onClick={() => setShowCancelModal(false)}>
            Keep Booking
          </Button>
          <Button variant="danger" className="rounded-pill" onClick={handleCancelBooking}>
            Yes, Cancel Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Bookings;