// src/utils/adminNotifications.js

// Admin notification key
const ADMIN_NOTIFICATIONS_KEY = 'adminNotifications';
const BOOKING_REQUESTS_KEY = 'bookingRequests';

// Check if current user is admin
export const isAdmin = () => {
  const user = localStorage.getItem('currentUser');
  if (user) {
    const userData = JSON.parse(user);
    return userData.role === 'admin' || userData.email === 'admin@apexlegacy.com';
  }
  return false;
};

// Add a booking request from a user (called when someone books)
export const addBookingRequest = (bookingData) => {
  // Get existing booking requests
  let requests = [];
  const existing = localStorage.getItem(BOOKING_REQUESTS_KEY);
  if (existing) {
    requests = JSON.parse(existing);
  }
  
  // Create new request
  const newRequest = {
    id: Date.now(),
    ...bookingData,
    status: 'pending', // pending, confirmed, cancelled, completed
    createdAt: new Date().toISOString(),
    isRead: false
  };
  
  requests.unshift(newRequest);
  localStorage.setItem(BOOKING_REQUESTS_KEY, JSON.stringify(requests));
  
  // Also create an admin notification
  addAdminNotification(newRequest);
  
  return newRequest;
};

// Add admin notification
export const addAdminNotification = (bookingRequest) => {
  let notifications = [];
  const existing = localStorage.getItem(ADMIN_NOTIFICATIONS_KEY);
  if (existing) {
    notifications = JSON.parse(existing);
  }
  
  const newNotification = {
    id: Date.now(),
    type: 'new_booking',
    title: '📅 New Coffee Chat Booking!',
    message: `${bookingRequest.name} (${bookingRequest.email}) has scheduled a coffee chat on ${new Date(bookingRequest.date).toLocaleDateString()} at ${bookingRequest.time}. Meeting type: ${bookingRequest.meetingType === 'virtual' ? 'Virtual' : 'Phone Call'}`,
    date: new Date().toISOString(),
    read: false,
    icon: 'fa-coffee',
    color: '#ffd700',
    bookingId: bookingRequest.id,
    bookingDetails: bookingRequest,
    actionLink: '/admin/bookings'
  };
  
  notifications.unshift(newNotification);
  localStorage.setItem(ADMIN_NOTIFICATIONS_KEY, JSON.stringify(notifications));
  
  // Also show browser notification if permitted
  showBrowserNotification(bookingRequest);
  
  return newNotification;
};

// Show browser notification
const showBrowserNotification = (bookingRequest) => {
  if (Notification.permission === 'granted') {
    new Notification('New Coffee Chat Booking!', {
      body: `${bookingRequest.name} wants to schedule a coffee chat with you on ${new Date(bookingRequest.date).toLocaleDateString()} at ${bookingRequest.time}`,
      icon: '/static/image/IMG_20260215_112337_HDR.jpg'
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission();
  }
};

// Get all booking requests (admin only)
export const getAllBookingRequests = () => {
  const requests = localStorage.getItem(BOOKING_REQUESTS_KEY);
  return requests ? JSON.parse(requests) : [];
};

// Get admin notifications
export const getAdminNotifications = () => {
  const notifications = localStorage.getItem(ADMIN_NOTIFICATIONS_KEY);
  return notifications ? JSON.parse(notifications) : [];
};

// Update booking status
export const updateBookingStatus = (bookingId, status) => {
  let requests = getAllBookingRequests();
  const updated = requests.map(req => 
    req.id === bookingId ? { ...req, status, updatedAt: new Date().toISOString() } : req
  );
  localStorage.setItem(BOOKING_REQUESTS_KEY, JSON.stringify(updated));
  
  // Add notification for status change
  addStatusChangeNotification(bookingId, status);
};

// Add status change notification for admin
const addStatusChangeNotification = (bookingId, status) => {
  let notifications = [];
  const existing = localStorage.getItem(ADMIN_NOTIFICATIONS_KEY);
  if (existing) {
    notifications = JSON.parse(existing);
  }
  
  const statusMessages = {
    confirmed: '✅ Booking confirmed!',
    cancelled: '❌ Booking cancelled',
    completed: '✓ Booking completed'
  };
  
  const newNotification = {
    id: Date.now(),
    type: 'status_update',
    title: statusMessages[status] || `Booking ${status}`,
    message: `Booking #${bookingId} has been ${status}.`,
    date: new Date().toISOString(),
    read: false,
    icon: 'fa-check-circle',
    color: status === 'confirmed' ? '#4caf50' : status === 'cancelled' ? '#f44336' : '#2196f3',
    bookingId: bookingId,
    actionLink: '/admin/bookings'
  };
  
  notifications.unshift(newNotification);
  localStorage.setItem(ADMIN_NOTIFICATIONS_KEY, JSON.stringify(notifications));
};

// Mark admin notification as read
export const markAdminNotificationAsRead = (notificationId) => {
  let notifications = getAdminNotifications();
  const updated = notifications.map(notif => 
    notif.id === notificationId ? { ...notif, read: true } : notif
  );
  localStorage.setItem(ADMIN_NOTIFICATIONS_KEY, JSON.stringify(updated));
};

// Mark all admin notifications as read
export const markAllAdminNotificationsAsRead = () => {
  let notifications = getAdminNotifications();
  const updated = notifications.map(notif => ({ ...notif, read: true }));
  localStorage.setItem(ADMIN_NOTIFICATIONS_KEY, JSON.stringify(updated));
};

// Clear admin notifications
export const clearAdminNotifications = () => {
  localStorage.setItem(ADMIN_NOTIFICATIONS_KEY, JSON.stringify([]));
};

// Get unread count for admin
export const getUnreadAdminNotificationsCount = () => {
  const notifications = getAdminNotifications();
  return notifications.filter(n => !n.read).length;
};