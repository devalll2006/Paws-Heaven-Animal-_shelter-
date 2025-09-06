

     import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LostFound.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LostFound = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [formData, setFormData] = useState({
    type: 'lost',
    petName: '',
    petType: '',
    breed: '',
    color: '',
    lastSeen: '',
    date: '',
    contact: '',
    description: '',
    image: null,
    location: { lat: null, lng: null }
  });
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [locationError, setLocationError] = useState(false);

  // Fetch lost/found pets from backend
  const fetchPets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/lost-found?resolved=false${activeTab !== 'browse' ? `&type=${activeTab}` : ''}`);
      if (!response.ok) throw new Error('Failed to fetch pets');
      const data = await response.json();
      setPets(data);
      setMessage({ text: '', type: '' });
    } catch (error) {
      console.error('Error fetching pets:', error);
      setMessage({ text: 'Failed to load pets. Please try again later.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'browse' || activeTab === 'lost' || activeTab === 'found') {
      fetchPets();
    }
  }, [activeTab]);

  // Set initial map center based on user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          // Set default location if not already set
          if (!formData.location.lat || !formData.location.lng) {
            setFormData(prev => ({
              ...prev,
              location: { lat: latitude, lng: longitude }
            }));
          }
        },
        (error) => {
          console.log("Geolocation error:", error);
          // Set default to London if geolocation fails
          setMapCenter([51.505, -0.09]);
          if (!formData.location.lat || !formData.location.lng) {
            setFormData(prev => ({
              ...prev,
              location: { lat: 51.505, lng: -0.09 }
            }));
          }
        }
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setFormData({
      ...formData,
      location: { lat, lng }
    });
    setLocationError(false);
  };

  const handleLocationSelect = (e) => {
    if (!formData.location.lat || !formData.location.lng) {
      setLocationError(true);
    } else {
      setLocationError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate location
    if (!formData.location.lat || !formData.location.lng) {
      setLocationError(true);
      setMessage({ text: 'Please select a location on the map', type: 'error' });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/lost-found', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: formData.image,
          date: formData.date || new Date().toISOString().split('T')[0],
          location: formData.location
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit report');
      }

      const data = await response.json();
      setMessage({ text: 'Report submitted successfully!', type: 'success' });
      setFormData({
        type: 'lost',
        petName: '',
        petType: '',
        breed: '',
        color: '',
        lastSeen: '',
        date: '',
        contact: '',
        description: '',
        image: null,
        location: { lat: mapCenter[0], lng: mapCenter[1] }
      });
      setTimeout(() => {
        setMessage({ text: '', type: '' });
        setActiveTab('browse');
      }, 3000);
    } catch (error) {
      console.error('Error submitting report:', error);
      setMessage({ text: error.message || 'Failed to submit report. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const markAsResolved = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/lost-found/${id}/resolve`, {
        method: 'PUT'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to mark as resolved');
      }

      setPets(pets.filter(pet => pet._id !== id));
      setMessage({ text: 'Pet marked as reunited!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error('Error marking as resolved:', error);
      setMessage({ text: error.message || 'Failed to update status. Please try again.', type: 'error' });
    }
  };

  const renderBrowse = () => (
    <>
      <h1 className="page-title">Lost & Found Pets</h1>
      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}
      <div className="lf-actions">
        <button 
          className="btn btn-primary"
          onClick={() => setActiveTab('report')}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Report Lost/Found Pet'}
        </button>
      </div>

      <div className="lf-filters">
        <select 
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          disabled={isLoading}
        >
          <option value="browse">All Reports</option>
          <option value="lost">Lost Pets</option>
          <option value="found">Found Pets</option>
        </select>
      </div>

      {/* Live Map Section */}
      <div className="lf-map-container">
        <h2>Live Map of Reports</h2>
        <MapContainer 
          center={mapCenter} 
          zoom={13} 
          style={{ height: '400px', width: '100%', borderRadius: '8px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {pets.map(pet => (
            <Marker 
              key={`map-${pet._id}`} 
              position={[pet.location.lat, pet.location.lng]}
              icon={L.icon({
                iconUrl: pet.type === 'lost' 
                  ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
                  : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                shadowSize: [41, 41]
              })}
            >
              <Popup>
                <div className="map-popup">
                  {pet.imageUrl && <img src={pet.imageUrl} alt={pet.petName} className="popup-image" />}
                  <h4>{pet.petName}</h4>
                  <p><strong>Type:</strong> {pet.petType}</p>
                  <p><strong>Last Seen:</strong> {pet.lastSeen}</p>
                  <p><strong>Date:</strong> {new Date(pet.date).toLocaleDateString()}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Pets List */}
      <div className="lf-pets-grid">
        {isLoading ? (
          <div className="loading">Loading pets...</div>
        ) : pets.length === 0 ? (
          <div className="no-pets">No pets found matching your criteria.</div>
        ) : (
          pets.map(pet => (
            <div key={pet._id} className={`lf-pet-card ${pet.type}`}>
              <div className="lf-pet-image">
                {pet.imageUrl && <img src={pet.imageUrl} alt={pet.petName} />}
                <div className="lf-pet-type">{pet.type.toUpperCase()}</div>
              </div>
              <div className="lf-pet-info">
                <h3>{pet.petName}</h3>
                <p><strong>Type:</strong> {pet.petType}</p>
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Color:</strong> {pet.color}</p>
                <p><strong>Last Seen:</strong> {pet.lastSeen}</p>
                <p><strong>Date:</strong> {new Date(pet.date).toLocaleDateString()}</p>
                <p className="lf-pet-description">{pet.description}</p>
                <p><strong>Contact:</strong> {pet.contact}</p>
                <div className="lf-pet-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => markAsResolved(pet._id)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Mark as Reunited'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );

 const renderReportForm = () => (
  <div className="lf-form-container">
    <h1 className="page-title">
      {formData.type === 'lost' ? 'Report Lost Pet' : 'Report Found Pet'}
    </h1>
    {message.text && (
      <div className={`alert alert-${message.type}`}>{message.text}</div>
    )}
    
    <form onSubmit={handleSubmit} className="lf-form">
      
      <div className="form-group">
        <label>
          {formData.type === 'lost' ? 'Last Seen Location' : 'Found Location'}
        </label>
        <input
          type="text"
          name="lastSeen"
          value={formData.lastSeen}
          onChange={handleInputChange}
          onBlur={handleLocationSelect}
          required
          placeholder="Address or landmark"
          disabled={isLoading}
        />
        {locationError && (
          <div className="error-message">Please select a location on the map below</div>
        )}
      </div>

      {/* Location Map - Now interactive */}
      <div className="form-group">
        <label>Select Location on Map</label>
        <div className="location-preview-map">
          <MapContainer 
            center={mapCenter} 
            zoom={15} 
            style={{ height: '300px', width: '100%', borderRadius: '8px' }}
            onClick={handleMapClick}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {formData.location.lat && formData.location.lng && (
              <Marker position={[formData.location.lat, formData.location.lng]} />
            )}
          </MapContainer>
          <div className="map-instructions">
            Click on the map to set the exact location
          </div>
          {formData.location.lat && formData.location.lng && (
            <div className="coordinates">
              Coordinates: {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
            </div>
          )}
        </div>
      </div>

        <div className="form-group">
          <label>Report Type</label>
          <div className="lf-type-toggle">
            <button
              type="button"
              className={`toggle-option ${formData.type === 'lost' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, type: 'lost'})}
              disabled={isLoading}
            >
              Lost Pet
            </button>
            <button
              type="button"
              className={`toggle-option ${formData.type === 'found' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, type: 'found'})}
              disabled={isLoading}
            >
              Found Pet
            </button>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{formData.type === 'lost' ? 'Pet Name' : 'Description'}</label>
            <input
              type="text"
              name="petName"
              value={formData.petName}
              onChange={handleInputChange}
              required
              placeholder={formData.type === 'lost' ? "Pet's name" : "Brief description"}
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label>Pet Type</label>
            <select
              name="petType"
              value={formData.petType}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            >
              <option value="">Select</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Breed</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleInputChange}
              required
              placeholder="Breed or mix"
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label>Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              required
              placeholder="Primary color(s)"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            {formData.type === 'lost' ? 'Last Seen Location' : 'Found Location'}
          </label>
          <input
            type="text"
            name="lastSeen"
            value={formData.lastSeen}
            onChange={handleInputChange}
            onBlur={handleLocationSelect}
            required
            placeholder="Address or landmark"
            disabled={isLoading}
          />
        </div>

        {/* Location Preview Map */}
        {formData.location.lat && (
          <div className="form-group">
            <label>Location Preview</label>
            <div className="location-preview-map">
              <MapContainer 
                center={[formData.location.lat, formData.location.lng]} 
                zoom={15} 
                style={{ height: '200px', width: '100%', borderRadius: '8px' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[formData.location.lat, formData.location.lng]} />
              </MapContainer>
            </div>
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label>Contact Information</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
              placeholder="Phone or email"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Additional Details</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            placeholder={`Describe ${formData.type === 'lost' ? 'your pet' : 'the pet'} and any identifying features`}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isLoading}
          />
          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setActiveTab('browse');
              setMessage({ text: '', type: '' });
            }}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="lost-found-page">
      {/* Navbar - Same as Homepage */}
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="navbar-brand">
                     <img 
                       src="https://cdn-icons-png.flaticon.com/512/194/194279.png" 
                       alt="Paws Haven Logo" 
                       className="navbar-logo"
                     />
                     Paws Haven
                   </Link>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/adopt">Adopt</Link>
            <Link to="/lost-found" className="active">Lost & Found</Link>
            <Link to="/vets">Vets</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lf-main">
        <div className="container">
          {activeTab === 'browse' || activeTab === 'lost' || activeTab === 'found' 
            ? renderBrowse() 
            : renderReportForm()
          }
        </div>
      </main>

      {/* Footer - Same as Homepage */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>Paws Haven</h3>
              <p>Helping pets find loving homes since 2015.</p>
              <div className="social-links">
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-twitter"></i></a>
                <a href="#"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/adopt">Adopt</Link></li>
                <li><Link to="/lost-found">Lost & Found</Link></li>
                <li><Link to="/vets">Veterinary Services</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/volunteer">Volunteer</Link></li>
                <li><Link to="/donate">Donate</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact</h4>
              <ul>
                <li>123 Shelter Way, Petville</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@pawshaven.org</li>
                <li>Emergency: 24/7 Hotline</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Paws Haven. All rights reserved.</p>
            <div className="legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LostFound;