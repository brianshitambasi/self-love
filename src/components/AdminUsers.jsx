// components/AdminUsers.jsx - With Export/Import
import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, Button, Modal, Form, Alert } from 'react-bootstrap';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserData, setEditUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    const registeredUsers = localStorage.getItem('registeredUsers');
    let userList = registeredUsers ? JSON.parse(registeredUsers) : [];
    
    // Ensure admin is always there
    const adminExists = userList.some(u => u.email === 'admin@apexlegacy.com');
    if (!adminExists) {
      userList.unshift({
        id: 'admin-001',
        name: 'Brian Shitambasi',
        email: 'admin@apexlegacy.com',
        role: 'admin',
        createdAt: new Date().toISOString(),
        isAdmin: true
      });
      localStorage.setItem('registeredUsers', JSON.stringify(userList));
    }
    
    setUsers(userList);
    setLoading(false);
  };

  // Export users to JSON file
  const exportUsers = () => {
    const exportUsers = users.filter(u => u.role !== 'admin');
    const dataStr = JSON.stringify(exportUsers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `users_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setAlert({ type: 'success', message: 'Users exported successfully!' });
    setTimeout(() => setAlert(null), 3000);
  };

  // Import users from JSON file
  const importUsers = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedUsers = JSON.parse(e.target.result);
        let currentUsers = [...users];
        
        importedUsers.forEach(importedUser => {
          const exists = currentUsers.some(u => u.email === importedUser.email);
          if (!exists && importedUser.role !== 'admin') {
            currentUsers.push({
              ...importedUser,
              id: Date.now() + Math.random(),
              createdAt: new Date().toISOString()
            });
          }
        });
        
        localStorage.setItem('registeredUsers', JSON.stringify(currentUsers));
        loadUsers();
        setAlert({ type: 'success', message: `Imported ${importedUsers.length} users successfully!` });
        setTimeout(() => setAlert(null), 3000);
      } catch (error) {
        setAlert({ type: 'danger', message: 'Invalid JSON file!' });
        setTimeout(() => setAlert(null), 3000);
      }
    };
    reader.readAsText(file);
    setShowImportModal(false);
  };

  // Add new user manually
  const addNewUser = (userData) => {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    
    const updatedUsers = [...users, newUser];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    loadUsers();
    setAlert({ type: 'success', message: `User ${userData.name} added!` });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDeleteUser = () => {
    if (selectedUser && selectedUser.role !== 'admin') {
      const updatedUsers = users.filter(u => u.id !== selectedUser.id);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      loadUsers();
      setShowDeleteModal(false);
      setSelectedUser(null);
      setAlert({ type: 'success', message: `User ${selectedUser.name} deleted.` });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleEditUser = () => {
    const updatedUsers = users.map(u => 
      u.id === editUserData.id ? { ...u, ...editUserData } : u
    );
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    loadUsers();
    setShowEditModal(false);
    setAlert({ type: 'success', message: `User ${editUserData.name} updated.` });
    setTimeout(() => setAlert(null), 3000);
  };

  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return <Badge bg="danger">Admin</Badge>;
    }
    return <Badge bg="primary">User</Badge>;
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #05070a, #0a0f1a)', paddingTop: '80px' }}>
        <div style={{ textAlign: 'center' }}>
          <i className="fas fa-spinner fa-spin fa-3x" style={{ color: '#ffd700' }}></i>
          <p style={{ color: '#aaa', marginTop: '1rem' }}>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <section style={{ background: 'linear-gradient(135deg, #05070a 0%, #0a0f1a 100%)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
      <Container>
        {alert && (
          <Alert variant={alert.type} className="mb-3 rounded-pill" dismissible onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        )}

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h1 className="display-5 fw-bold mb-2" style={{ color: '#fff' }}>
                <i className="fas fa-users-cog me-3" style={{ color: '#ffd700' }}></i>
                Manage Users
              </h1>
              <p style={{ color: '#aaa' }}>View and manage all registered users</p>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-success" size="sm" onClick={exportUsers}>
                <i className="fas fa-download me-1"></i> Export Users
              </Button>
              <Button variant="outline-primary" size="sm" onClick={() => setShowImportModal(true)}>
                <i className="fas fa-upload me-1"></i> Import Users
              </Button>
              <Button variant="outline-warning" size="sm" onClick={loadUsers}>
                <i className="fas fa-sync-alt me-1"></i> Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <Card className="border-0 rounded-4 mb-4" style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)' }}>
          <Card.Body className="p-3">
            <div className="d-flex align-items-center gap-2">
              <i className="fas fa-info-circle text-warning"></i>
              <small style={{ color: '#aaa' }}>
                Users register on their own devices. To see all users, export data from each device and import here, or use a shared cloud storage solution.
              </small>
            </div>
          </Card.Body>
        </Card>

        <Card className="border-0 rounded-4" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,215,0,0.2)' }}>
                    <th className="p-3">User</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Joined</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,215,0,0.1)' }}>
                      <td className="p-3">
                        <div className="d-flex align-items-center gap-2">
                          <img 
                            src={user.avatar || `https://ui-avatars.com/api/?background=ffd700&color=1a1a2e&name=${encodeURIComponent(user.name || 'User')}`}
                            alt={user.name}
                            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                          />
                          <code>{user.id.substring(0, 8)}...</code>
                        </div>
                      </td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{getRoleBadge(user.role || 'user')}</td>
                      <td className="p-3">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td className="p-3">
                        <div className="d-flex gap-2">
                          {user.role !== 'admin' && (
                            <>
                              <Button 
                                variant="outline-warning" 
                                size="sm"
                                onClick={() => {
                                  setEditUserData(user);
                                  setShowEditModal(true);
                                }}
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowDeleteModal(true);
                                }}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </Button>
                            </>
                          )}
                          {user.role === 'admin' && (
                            <span className="text-muted">Protected</span>
                          )}
                        </div>
                       </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>

        <div className="text-center mt-4">
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            <p className="small" style={{ color: '#666' }}>
              <i className="fas fa-users me-1"></i>
              Total Users: <strong className="text-warning">{users.length}</strong>
            </p>
            <p className="small" style={{ color: '#666' }}>
              <i className="fas fa-shield-alt me-1"></i>
              Admins: <strong className="text-danger">{users.filter(u => u.role === 'admin').length}</strong>
            </p>
            <p className="small" style={{ color: '#666' }}>
              <i className="fas fa-user me-1"></i>
              Regular Users: <strong className="text-success">{users.filter(u => u.role !== 'admin').length}</strong>
            </p>
          </div>
        </div>
      </Container>

      {/* Import Modal */}
      <Modal show={showImportModal} onHide={() => setShowImportModal(false)} centered>
        <Modal.Header closeButton style={{ background: '#1a1a2e', borderBottom: '1px solid rgba(255,215,0,0.2)' }}>
          <Modal.Title style={{ color: '#ffd700' }}>Import Users</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1a1a2e', color: '#fff' }}>
          <p>Select a JSON file exported from another device to import users.</p>
          <Form.Group>
            <Form.Control
              type="file"
              accept=".json"
              onChange={importUsers}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
            />
          </Form.Group>
          <hr style={{ borderColor: 'rgba(255,215,0,0.2)' }} />
          <small className="text-muted">Note: This will add new users without removing existing ones.</small>
        </Modal.Body>
        <Modal.Footer style={{ background: '#1a1a2e', borderTop: '1px solid rgba(255,215,0,0.2)' }}>
          <Button variant="secondary" onClick={() => setShowImportModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton style={{ background: '#1a1a2e', borderBottom: '1px solid rgba(255,215,0,0.2)' }}>
          <Modal.Title style={{ color: '#ffd700' }}>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1a1a2e', color: '#fff' }}>
          Are you sure you want to delete <strong>{selectedUser?.name}</strong>?
          <p className="mt-2 small text-danger">⚠️ This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer style={{ background: '#1a1a2e', borderTop: '1px solid rgba(255,215,0,0.2)' }}>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteUser}>Delete User</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton style={{ background: '#1a1a2e', borderBottom: '1px solid rgba(255,215,0,0.2)' }}>
          <Modal.Title style={{ color: '#ffd700' }}>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1a1a2e', color: '#fff' }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ffd700' }}>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={editUserData.name || ''}
                onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ffd700' }}>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={editUserData.email || ''}
                onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ background: '#1a1a2e', borderTop: '1px solid rgba(255,215,0,0.2)' }}>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="warning" onClick={handleEditUser}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default AdminUsers;