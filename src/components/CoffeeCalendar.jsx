// components/CoffeeCalendar.jsx - Updated to send admin notifications
import React, { useState } from 'react';
import { addBookingRequest } from '../utils/adminNotifications';

const CoffeeCalendar = ({ onClose, onSchedule }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [meetingType, setMeetingType] = useState('virtual');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  // Add user notification (for the user who booked)
  const addUserNotification = (bookingData) => {
    let notifications = [];
    const existingNotifications = localStorage.getItem('userNotifications');
    
    if (existingNotifications) {
      notifications = JSON.parse(existingNotifications);
    }
    
    const newNotification = {
      id: Date.now(),
      type: 'booking',
      title: '☕ Coffee Chat Scheduled!',
      message: `Your coffee chat has been scheduled for ${new Date(bookingData.date).toLocaleDateString()} at ${bookingData.time}. Brian will contact you via ${bookingData.email}.`,
      date: new Date().toISOString(),
      read: false,
      icon: 'fa-coffee',
      color: '#ffd700',
      actionLink: '/bookings',
      bookingDetails: bookingData
    };
    
    notifications.unshift(newNotification);
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
    
    const unreadCount = notifications.filter(n => !n.read).length;
    localStorage.setItem('notificationCount', unreadCount);
    window.dispatchEvent(new CustomEvent('notificationUpdate', { detail: unreadCount }));
    
    console.log('User notification saved:', newNotification);
  };

  // Save user's own booking
  const saveUserBooking = (bookingData) => {
    let bookings = [];
    const existingBookings = localStorage.getItem('userBookings');
    
    if (existingBookings) {
      bookings = JSON.parse(existingBookings);
    }
    
    const newBooking = {
      id: Date.now(),
      type: 'Coffee Chat',
      date: bookingData.date,
      time: bookingData.time,
      status: 'upcoming',
      icon: 'fa-coffee',
      color: '#4caf50',
      with: 'Brian Shitambasi',
      meetingType: bookingData.meetingType === 'virtual' ? 'Virtual' : 'Phone Call',
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      createdAt: new Date().toISOString()
    };
    
    bookings.unshift(newBooking);
    localStorage.setItem('userBookings', JSON.stringify(bookings));
    
    console.log('User booking saved:', newBooking);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingData = {
      date: selectedDate,
      time: selectedTime,
      name,
      email,
      phone,
      meetingType,
      bookingId: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      // Save for the user
      saveUserBooking(bookingData);
      addUserNotification(bookingData);
      
      // Send to admin (THIS IS THE KEY - Admin will receive this)
      const adminRequest = addBookingRequest(bookingData);
      
      onSchedule(bookingData);
      setIsSubmitting(false);
      
      alert(`✅ Coffee session scheduled successfully!\n\n📅 Date: ${new Date(selectedDate).toLocaleDateString()}\n⏰ Time: ${selectedTime}\n📧 Confirmation sent to: ${email}\n\n🔔 Brian has been notified and will confirm your booking soon.`);
      
      onClose();
    }, 1000);
  };

  // Rest of your component JSX remains the same...
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>×</button>
        
        <div style={styles.header}>
          <i className="fas fa-calendar-alt" style={styles.headerIcon}></i>
          <h2 style={styles.title}>Schedule Your Success Coffee Session</h2>
          <p style={styles.subtitle}>Let's connect and discuss your goals over a virtual coffee</p>
        </div>

        {step === 1 ? (
          <div style={styles.content}>
            <div style={styles.section}>
              <label style={styles.label}>
                <i className="fas fa-calendar-day"></i> Select Date
              </label>
              <input
                type="date"
                style={styles.input}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                required
              />
            </div>

            <div style={styles.section}>
              <label style={styles.label}>
                <i className="fas fa-clock"></i> Select Time
              </label>
              <div style={styles.timeGrid}>
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    style={{
                      ...styles.timeSlot,
                      ...(selectedTime === time ? styles.timeSlotSelected : {})
                    }}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button
              style={{
                ...styles.nextBtn,
                ...(!selectedDate || !selectedTime ? styles.disabledBtn : {})
              }}
              onClick={() => selectedDate && selectedTime && setStep(2)}
              disabled={!selectedDate || !selectedTime}
            >
              Continue to Details <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.content}>
            <div style={styles.section}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                style={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
              />
            </div>

            <div style={styles.section}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="john@example.com"
              />
            </div>

            <div style={styles.section}>
              <label style={styles.label}>Phone Number</label>
              <input
                type="tel"
                style={styles.input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 XXX XXX XXX"
              />
            </div>

            <div style={styles.section}>
              <label style={styles.label}>Meeting Type</label>
              <div style={styles.meetingTypeGrid}>
                <button
                  type="button"
                  style={{
                    ...styles.meetingTypeBtn,
                    ...(meetingType === 'virtual' ? styles.meetingTypeSelected : {})
                  }}
                  onClick={() => setMeetingType('virtual')}
                >
                  <i className="fas fa-video"></i> Virtual
                </button>
                <button
                  type="button"
                  style={{
                    ...styles.meetingTypeBtn,
                    ...(meetingType === 'phone' ? styles.meetingTypeSelected : {})
                  }}
                  onClick={() => setMeetingType('phone')}
                >
                  <i className="fas fa-phone-alt"></i> Phone Call
                </button>
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button type="button" style={styles.backBtn} onClick={() => setStep(1)}>
                <i className="fas fa-arrow-left"></i> Back
              </button>
              <button type="submit" style={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? (
                  <><i className="fas fa-spinner fa-spin"></i> Scheduling...</>
                ) : (
                  <><i className="fas fa-check-circle"></i> Confirm Session</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// Styles remain the same as your existing styles...
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '1rem'
  },
  modal: {
    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    borderRadius: '24px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 215, 0, 0.3)'
  },
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#fff',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  header: {
    textAlign: 'center',
    padding: '2rem',
    borderBottom: '1px solid rgba(255, 215, 0, 0.1)'
  },
  headerIcon: {
    fontSize: '2.5rem',
    color: '#ffd700',
    marginBottom: '0.5rem'
  },
  title: {
    color: '#ffd700',
    fontSize: '1.5rem',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#aaa',
    fontSize: '0.85rem'
  },
  content: {
    padding: '2rem'
  },
  section: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    color: '#ffd700',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: 'bold'
  },
  timeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '0.5rem'
  },
  timeSlot: {
    padding: '0.6rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '0.85rem'
  },
  timeSlotSelected: {
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    color: '#1a1a2e',
    borderColor: 'transparent'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '0.9rem'
  },
  meetingTypeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem'
  },
  meetingTypeBtn: {
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  meetingTypeSelected: {
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    color: '#1a1a2e'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  nextBtn: {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    border: 'none',
    borderRadius: '8px',
    color: '#1a1a2e',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  backBtn: {
    flex: 1,
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer'
  },
  submitBtn: {
    flex: 2,
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    border: 'none',
    borderRadius: '8px',
    color: '#1a1a2e',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  disabledBtn: {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
};

export default CoffeeCalendar;