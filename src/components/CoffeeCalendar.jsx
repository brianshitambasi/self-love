// components/CoffeeCalendar.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CoffeeCalendar = ({ onClose, onSchedule }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [meetingType, setMeetingType] = useState('virtual');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  // Disable past dates and weekends
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
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
      bookingId: Date.now().toString()
    };

    // Simulate API call
    setTimeout(() => {
      onSchedule(bookingData);
      setIsSubmitting(false);
      alert(`☕ Coffee session scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}!\n\nCheck your email (${email}) for confirmation and calendar invite.`);
      onClose();
    }, 1000);
  };

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
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                filterDate={isWeekday}
                dateFormat="MMMM d, yyyy"
                className="date-picker-input"
                inline
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
                ...(!selectedTime ? styles.disabledBtn : {})
              }}
              onClick={() => selectedTime && setStep(2)}
              disabled={!selectedTime}
            >
              Continue to Details <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.content}>
            <div style={styles.section}>
              <label style={styles.label}>
                <i className="fas fa-user"></i> Full Name
              </label>
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
              <label style={styles.label}>
                <i className="fas fa-envelope"></i> Email Address
              </label>
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
              <label style={styles.label}>
                <i className="fas fa-phone"></i> Phone Number
              </label>
              <input
                type="tel"
                style={styles.input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div style={styles.section}>
              <label style={styles.label}>
                <i className="fas fa-video"></i> Meeting Type
              </label>
              <div style={styles.meetingTypeGrid}>
                <button
                  type="button"
                  style={{
                    ...styles.meetingTypeBtn,
                    ...(meetingType === 'virtual' ? styles.meetingTypeSelected : {})
                  }}
                  onClick={() => setMeetingType('virtual')}
                >
                  <i className="fas fa-video"></i> Virtual (Zoom/Google Meet)
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

            <div style={styles.section}>
              <div style={styles.selectedInfo}>
                <i className="fas fa-calendar-check"></i>
                <span>
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {selectedTime}
                </span>
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button
                type="button"
                style={styles.backBtn}
                onClick={() => setStep(1)}
              >
                <i className="fas fa-arrow-left"></i> Back
              </button>
              <button
                type="submit"
                style={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <> <i className="fas fa-spinner fa-spin"></i> Scheduling... </>
                ) : (
                  <> <i className="fas fa-check-circle"></i> Confirm Session </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

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
    maxWidth: '700px',
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
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#fff',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
    zIndex: 1
  },
  header: {
    textAlign: 'center',
    padding: '2rem 2rem 1rem',
    borderBottom: '1px solid rgba(255, 215, 0, 0.1)'
  },
  headerIcon: {
    fontSize: '3rem',
    color: '#ffd700',
    marginBottom: '1rem'
  },
  title: {
    color: '#ffd700',
    fontSize: '1.8rem',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#aaa',
    fontSize: '0.9rem'
  },
  content: {
    padding: '2rem'
  },
  section: {
    marginBottom: '2rem'
  },
  label: {
    display: 'block',
    color: '#ffd700',
    marginBottom: '0.75rem',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  timeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '0.75rem'
  },
  timeSlot: {
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '0.9rem'
  },
  timeSlotSelected: {
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    color: '#1a1a2e',
    borderColor: 'transparent'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '1rem',
    transition: 'all 0.3s'
  },
  meetingTypeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  meetingTypeBtn: {
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
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
    color: '#1a1a2e',
    borderColor: 'transparent'
  },
  selectedInfo: {
    padding: '1rem',
    background: 'rgba(255, 215, 0, 0.1)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#ffd700'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  nextBtn: {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    border: 'none',
    borderRadius: '12px',
    color: '#1a1a2e',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
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
    borderRadius: '12px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  submitBtn: {
    flex: 2,
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    border: 'none',
    borderRadius: '12px',
    color: '#1a1a2e',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
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

// Add global styles for date picker
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .date-picker-input {
    width: 100%;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .react-datepicker {
    background: #1a1a2e;
    border: 1px solid rgba(255, 215, 0, 0.3);
    font-family: inherit;
  }
  
  .react-datepicker__header {
    background: #16213e;
    border-bottom-color: rgba(255, 215, 0, 0.2);
  }
  
  .react-datepicker__current-month,
  .react-datepicker__day-name,
  .react-datepicker__day {
    color: #fff;
  }
  
  .react-datepicker__day:hover {
    background: #ffd700;
    color: #1a1a2e;
  }
  
  .react-datepicker__day--selected {
    background: #ffd700;
    color: #1a1a2e;
  }
  
  .react-datepicker__day--disabled {
    color: #666;
  }
  
  .react-datepicker__navigation-icon::before {
    border-color: #ffd700;
  }
`;
document.head.appendChild(styleSheet);

export default CoffeeCalendar;