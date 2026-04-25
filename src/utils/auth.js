// src/utils/auth.js

export const ROLES = {
  GUEST: 'guest',
  USER: 'user',
  ADMIN: 'admin'
};

export const getUserRole = () => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    try {
      const userData = JSON.parse(currentUser);
      if (userData.role) return userData.role;
    } catch (e) {
      console.error('Error parsing currentUser', e);
    }
  }
  
  const userRole = localStorage.getItem('userRole');
  if (userRole && (userRole === ROLES.ADMIN || userRole === ROLES.USER)) {
    return userRole;
  }
  
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail === 'admin@apexlegacy.com') {
      return ROLES.ADMIN;
    }
    return ROLES.USER;
  }
  
  return ROLES.GUEST;
};

export const isAuthenticated = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentUser = localStorage.getItem('currentUser');
  return isLoggedIn && currentUser !== null;
};

export const isAdmin = () => {
  const role = getUserRole();
  return role === ROLES.ADMIN;
};

export const getCurrentUser = () => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    try {
      return JSON.parse(currentUser);
    } catch (e) {
      console.error('Error parsing currentUser', e);
      return null;
    }
  }
  
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    return {
      id: 'legacy-user',
      name: localStorage.getItem('userName') || 'User',
      email: localStorage.getItem('userEmail') || 'user@example.com',
      role: getUserRole(),
      isLoggedIn: true
    };
  }
  
  return null;
};

export const login = (email, password) => {
  if (email === 'admin@apexlegacy.com' && password === 'Brian@2025') {
    const adminUser = {
      id: 'admin-001',
      name: 'Brian Shitambasi',
      email: email,
      role: ROLES.ADMIN,
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(adminUser));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', ROLES.ADMIN);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', 'Brian Shitambasi');
    return { success: true, user: adminUser, role: ROLES.ADMIN };
  }
  
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: ROLES.USER,
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', ROLES.USER);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', user.name);
    return { success: true, user: userData, role: ROLES.USER };
  }
  
  return { success: false, error: 'Invalid email or password' };
};

export const register = (name, email, password) => {
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'User already exists with this email' };
  }
  
  const newUser = {
    id: Date.now().toString(),
    name: name,
    email: email,
    password: password,
    role: ROLES.USER,
    createdAt: new Date().toISOString(),
    profileComplete: false
  };
  
  users.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  
  const userData = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: ROLES.USER,
    isLoggedIn: true,
    loginTime: new Date().toISOString()
  };
  localStorage.setItem('currentUser', JSON.stringify(userData));
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userRole', ROLES.USER);
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userName', name);
  
  return { success: true, user: newUser };
};

export const logout = () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userRole');
  window.location.href = '/';
};

export const getUserDisplayName = () => {
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.name) {
    return currentUser.name;
  }
  const userName = localStorage.getItem('userName');
  if (userName) return userName;
  return 'Guest';
};

export const hasRole = (role) => {
  const userRole = getUserRole();
  return userRole === role;
};

export const isAdminUser = () => {
  return hasRole(ROLES.ADMIN);
};
