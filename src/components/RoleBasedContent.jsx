// components/RoleBasedContent.jsx
import React from 'react';
import { isAuthenticated, getUserRole, ROLES } from '../utils/auth';

const RoleBasedContent = ({ 
  adminContent, 
  userContent, 
  guestContent,
  fallback = null 
}) => {
  const isAuth = isAuthenticated();
  const userRole = getUserRole();
  
  if (userRole === ROLES.ADMIN && adminContent) {
    return adminContent;
  }
  
  if (isAuth && userContent) {
    return userContent;
  }
  
  if (!isAuth && guestContent) {
    return guestContent;
  }
  
  return fallback;
};

export default RoleBasedContent;