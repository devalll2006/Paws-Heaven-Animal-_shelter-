import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [adoptionApplications, setAdoptionApplications] = useState([]);
  const [donations, setDonations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('adoptions');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userData || !token) {
      window.location.href = '/login';
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Check if user is admin
    if (parsedUser.role !== 'admin') {
      alert('Access denied. Admin privileges required.');
      window.location.href = '/';
      return;
    }

    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [adoptionsRes, donationsRes, messagesRes] = await Promise.all([
        fetch('http://localhost:5000/api/applications'),
        fetch('http://localhost:5000/api/donations'),
        fetch('http://localhost:5000/api/messages')
      ]);

      if (adoptionsRes.ok) {
        const adoptions = await adoptionsRes.json();
        setAdoptionApplications(adoptions);
      }

      if (donationsRes.ok) {
        const donations = await donationsRes.json();
        setDonations(donations);
      }

      if (messagesRes.ok) {
        const messages = await messagesRes.json();
        setMessages(messages);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (loading) {
    return <div className="loading">Loading admin panel...</div>;
  }

  return (
    <div className="admin-panel">
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/194/194279.png" 
              alt="Paws Haven Logo" 
              className="navbar-logo"
            />
            Paws Haven - Admin Panel
          </Link>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/adopt">Adopt</Link>
            <Link to="/profile" className="active">Admin Panel</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </nav>

      <main className="admin-main">
        <div className="container">
          <div className="admin-header">
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user?.name}</p>
          </div>

          <div className="admin-tabs">
            <button 
              className={activeTab === 'adoptions' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('adoptions')}
            >
              Adoption Applications ({adoptionApplications.length})
            </button>
            <button 
              className={activeTab === 'donations' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('donations')}
            >
              Donations ({donations.length})
            </button>
            <button 
              className={activeTab === 'messages' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('messages')}
            >
              Messages ({messages.length})
            </button>
          </div>

          <div className="admin-content">
            {activeTab === 'adoptions' && (
              <div className="adoptions-section">
                <h2>Adoption Applications</h2>
                {adoptionApplications.length > 0 ? (
                  <div className="data-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Pet Name</th>
                          <th>Applicant</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adoptionApplications.map((app, index) => (
                          <tr key={index}>
                            <td>{app.petName}</td>
                            <td>{app.applicantName}</td>
                            <td>{app.applicantEmail}</td>
                            <td>{app.phone || 'N/A'}</td>
                            <td><span className={`status ${app.status}`}>{app.status}</span></td>
                            <td>{new Date(app.date).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No adoption applications found.</p>
                )}
              </div>
            )}

            {activeTab === 'donations' && (
              <div className="donations-section">
                <h2>Donations</h2>
                {donations.length > 0 ? (
                  <div className="data-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Donor Name</th>
                          <th>Email</th>
                          <th>Amount</th>
                          <th>Type</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {donations.map((donation, index) => (
                          <tr key={index}>
                            <td>{donation.donorName}</td>
                            <td>{donation.email}</td>
                            <td>${donation.amount}</td>
                            <td>{donation.type}</td>
                            <td>{new Date(donation.date).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No donations found.</p>
                )}
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="messages-section">
                <h2>Contact Messages</h2>
                {messages.length > 0 ? (
                  <div className="messages-list">
                    {messages.map((message, index) => (
                      <div key={index} className="message-card">
                        <div className="message-header">
                          <h4>{message.name}</h4>
                          <span className="message-date">{new Date(message.date).toLocaleDateString()}</span>
                        </div>
                        <p><strong>Email:</strong> {message.email}</p>
                        <p><strong>Subject:</strong> {message.subject}</p>
                        <p><strong>Message:</strong> {message.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No messages found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;