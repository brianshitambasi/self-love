// src/components/AdminUsers.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, Button, Modal, Form } from 'react-bootstrap';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserData, setEditUserData] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const registeredUsers = localStorage.getItem('registeredUsers');
    let userList = registeredUsers ? JSON.parse(registeredUsers) : [];
    
    // Add admin user if not exists
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
  };

  const handleDeleteUser = () => {
    if (selectedUser && selectedUser.role !== 'admin') {
      const updatedUsers = users.filter(u => u.id !== selectedUser.id);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      loadUsers();
      setShowDeleteModal(false);
      setSelectedUser(null);
      alert(`✅ User ${selectedUser.name} has been deleted.`);
    }
  };

  const handleEditUser = () => {
    const updatedUsers = users.map(u => 
      u.id === editUserData.id ? { ...u, ...editUserData } : u
    );
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    loadUsers();
    setShowEditModal(false);
    alert(`✅ User ${editUserData.name} has been updated.`);
  };

  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return <Badge bg="danger">Admin</Badge>;
    }
    return <Badge bg="primary">User</Badge>;
  };

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
            <i className="fas fa-users-cog me-3" style={{ color: '#ffd700' }}></i>
            Manage Users
          </h1>
          <p style={{ color: '#aaa' }}>View and manage all registered users</p>
        </div>

        <Card className="border-0 rounded-4" style={{ background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.2)' }}>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0" style={{ borderRadius: '16px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,215,0,0.2)' }}>
                    <th className="p-3">ID</th>
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
                      <td className="p-3"><code>{user.id.substring(0, 8)}...</code></td>
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
                                <i className="fas fa-edit"></i> Edit
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowDeleteModal(true);
                                }}
                              >
                                <i className="fas fa-trash-alt"></i> Delete
                              </Button>
                            </>
                          )}
                          {user.role === 'admin' && (
                            <span className="text-muted">Protected Account</span>
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
          <p className="small" style={{ color: '#666' }}>
            <i className="fas fa-shield-alt me-1"></i>
            Total Users: {users.length} | Admins: {users.filter(u => u.role === 'admin').length} | Regular: {users.filter(u => u.role !== 'admin').length}
          </p>
        </div>
      </Container>

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
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ffd700' }}>User Role</Form.Label>
              <Form.Select
                value={editUserData.role || 'user'}
                onChange={(e) => setEditUserData({ ...editUserData, role: e.target.value })}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', color: '#fff' }}
              >
                <option value="user">Regular User</option>
                <option value="admin">Admin</option>
              </Form.Select>
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