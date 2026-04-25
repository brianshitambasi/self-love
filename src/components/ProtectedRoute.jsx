// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole, ROLES } from '../utils/auth';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const isAuth = isAuthenticated();
  const userRole = getUserRole();
  
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && userRole !== requiredRole && userRole !== ROLES.ADMIN) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default ProtectedRoute;