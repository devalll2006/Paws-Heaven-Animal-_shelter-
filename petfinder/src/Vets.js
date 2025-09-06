import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Vets.css';

const VetDirectory = () => {
  // Sample vet data with proper image URLs
  const allVets = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'General Practice',
      clinic: 'Paws & Claws Animal Hospital',
      address: '123 Pet Care Ave, New York, NY',
      phone: '(555) 123-4567',
      email: 's.johnson@pawsclaws.com',
      availability: ['Mon-Fri: 9am-5pm', 'Sat: 10am-2pm'],
      areas: ['New York', 'Brooklyn', 'Queens'],
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Surgery',
      clinic: 'Animal Wellness Center',
      address: '456 Vet Street, Chicago, IL',
      phone: '(555) 234-5678',
      email: 'm.chen@wellnessvet.com',
      availability: ['Mon-Wed-Fri: 8am-6pm', 'Tue-Thu: 10am-4pm'],
      areas: ['Chicago', 'Evanston'],
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      clinic: 'Healthy Pets Veterinary Clinic',
      address: '789 Animal Care Rd, Los Angeles, CA',
      phone: '(555) 345-6789',
      email: 'e.rodriguez@healthypets.com',
      availability: ['Mon-Tue-Thu-Fri: 9am-5pm', 'Wed: 12pm-8pm'],
      areas: ['Los Angeles', 'Beverly Hills', 'Santa Monica'],
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Emergency Care',
      clinic: '24/7 Animal Emergency',
      address: '101 Critical Care Blvd, Austin, TX',
      phone: '(555) 456-7890',
      email: 'j.wilson@animalemergency.com',
      availability: ['24/7 Emergency Service'],
      areas: ['Austin', 'Round Rock', 'San Marcos'],
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ];

  // State for filters
  const [filters, setFilters] = useState({
    area: '',
    specialty: ''
  });

  // State for appointment booking
  const [booking, setBooking] = useState({
    vetId: null,
    date: '',
    time: '',
    reason: '',
    petName: '',
    petType: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: ''
  });

  const [isBooking, setIsBooking] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get unique values for filter options
  const areas = ['All Areas', ...new Set(allVets.flatMap(vet => vet.areas))];
  const specialties = ['All Specialties', ...new Set(allVets.map(vet => vet.specialty))];

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value === 'All Areas' || value === 'All Specialties' ? '' : value
    });
  };

  // Filter vets based on selected filters
  const filteredVets = allVets.filter(vet => {
    return (
      (filters.area === '' || vet.areas.includes(filters.area)) &&
      (filters.specialty === '' || vet.specialty === filters.specialty)
    );
  });

  // Handle booking form input changes
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking({
      ...booking,
      [name]: value
    });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    console.log('File selected:', e.target.files[0]);
  };

  // Start booking process
  const startBooking = (vetId) => {
    setBooking({
      ...booking,
      vetId: vetId,
      date: '',
      time: '',
      reason: '',
      petName: '',
      petType: '',
      ownerName: '',
      ownerEmail: '',
      ownerPhone: ''
    });
    setIsBooking(true);
    setIsSubmitted(false);
    setError(null);
    window.scrollTo(0, 0);
  };

  // Cancel booking
  const cancelBooking = () => {
    setIsBooking(false);
    setBooking({
      ...booking,
      vetId: null
    });
  };

  // Validate form
  const validateForm = () => {
    if (!booking.date) {
      setError('Please select a date');
      return false;
    }
    if (!booking.time) {
      setError('Please select a time');
      return false;
    }
    if (!booking.petName) {
      setError('Please enter your pet\'s name');
      return false;
    }
    if (!booking.petType) {
      setError('Please select your pet type');
      return false;
    }
    if (!booking.ownerName) {
      setError('Please enter your name');
      return false;
    }
    if (!booking.ownerEmail) {
      setError('Please enter your email');
      return false;
    }
    if (!booking.ownerPhone) {
      setError('Please enter your phone number');
      return false;
    }
    return true;
  };

  // Submit booking
  const submitBooking = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const vet = allVets.find(v => v.id === booking.vetId);
      const response = await fetch('http://localhost:5000/api/vets/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vetId: booking.vetId,
          vetName: vet.name,
          clinic: vet.clinic,
          date: booking.date,
          time: booking.time,
          reason: booking.reason,
          petName: booking.petName,
          petType: booking.petType,
          ownerName: booking.ownerName,
          ownerEmail: booking.ownerEmail,
          ownerPhone: booking.ownerPhone
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to book appointment');
      }

      const data = await response.json();
      console.log('Appointment booked:', data);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError(err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vet-directory-page">
      {/* Navbar */}
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
            <Link to="/found-lost">Found & Lost</Link>
            <Link to="/vets" className="active">Vets</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="vet-main">
        <div className="container">
          <h1 className="page-title">Veterinary Directory</h1>
          <p className="page-subtitle">Find trusted veterinarians in your area</p>

          {/* Booking Form */}
          {isBooking && (
            <div className="booking-form-container">
              <h2>Book an Appointment with {
                allVets.find(vet => vet.id === booking.vetId)?.name || 'Vet'
              }</h2>
              
              {error && (
                <div className="alert alert-danger">
                  <strong>Error:</strong> {error}
                </div>
              )}
              
              {isSubmitted ? (
                <div className="booking-confirmation">
                  <div className="confirmation-icon">✓</div>
                  <h3>Appointment Request Submitted!</h3>
                  <p>You'll receive a confirmation email shortly.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={cancelBooking}
                  >
                    Back to Vets
                  </button>
                </div>
              ) : (
                <form onSubmit={submitBooking} className="booking-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        name="date"
                        value={booking.date}
                        onChange={handleBookingChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Time</label>
                      <input
                        type="time"
                        name="time"
                        value={booking.time}
                        onChange={handleBookingChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Pet's Name</label>
                    <input
                      type="text"
                      name="petName"
                      value={booking.petName}
                      onChange={handleBookingChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Pet Type</label>
                    <select
                      name="petType"
                      value={booking.petType}
                      onChange={handleBookingChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Bird">Bird</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Medical Reason</label>
                    <textarea
                      name="reason"
                      value={booking.reason}
                      onChange={handleBookingChange}
                      rows="4"
                      required
                      placeholder="Briefly describe the reason for the visit"
                    />
                  </div>

                  <div className="form-group">
                    <label>Upload Medical Records (Optional)</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={handleFileUpload}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Your Name</label>
                      <input
                        type="text"
                        name="ownerName"
                        value={booking.ownerName}
                        onChange={handleBookingChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Your Email</label>
                      <input
                        type="email"
                        name="ownerEmail"
                        value={booking.ownerEmail}
                        onChange={handleBookingChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Your Phone</label>
                    <input
                      type="tel"
                      name="ownerPhone"
                      value={booking.ownerPhone}
                      onChange={handleBookingChange}
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={cancelBooking}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Booking...' : 'Confirm Appointment'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Vet Directory */}
          {!isBooking && (
            <>
              {/* Filters */}
              <div className="vet-filters">
                <div className="filter-row">
                  <div className="filter-group">
                    <label htmlFor="area">Area</label>
                    <select
                      id="area"
                      name="area"
                      value={filters.area || 'All Areas'}
                      onChange={handleFilterChange}
                    >
                      {areas.map((area, index) => (
                        <option key={index} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group">
                    <label htmlFor="specialty">Specialty</label>
                    <select
                      id="specialty"
                      name="specialty"
                      value={filters.specialty || 'All Specialties'}
                      onChange={handleFilterChange}
                    >
                      {specialties.map((specialty, index) => (
                        <option key={index} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="results-count">
                {filteredVets.length} {filteredVets.length === 1 ? 'vet' : 'vets'} found
              </div>

              {/* Vets Grid */}
              <div className="vets-grid">
                {filteredVets.length > 0 ? (
                  filteredVets.map(vet => (
                    <div key={vet.id} className="vet-card">
                      <div className="vet-image">
                        <img src={vet.image} alt={vet.name} />
                      </div>
                      <div className="vet-info">
                        <h3>{vet.name}</h3>
                        <p className="vet-specialty">{vet.specialty}</p>
                        <p className="vet-clinic">{vet.clinic}</p>
                        <p className="vet-address">{vet.address}</p>
                        <p className="vet-contact">{vet.phone} • {vet.email}</p>
                        <div className="vet-availability">
                          <h4>Availability:</h4>
                          <ul>
                            {vet.availability.map((slot, index) => (
                              <li key={index}>{slot}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="vet-areas">
                          <h4>Serving Areas:</h4>
                          <div className="area-tags">
                            {vet.areas.map((area, index) => (
                              <span key={index} className="area-tag">{area}</span>
                            ))}
                          </div>
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={() => startBooking(vet.id)}
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <p>No vets match your current filters. Try adjusting your search criteria.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
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
                <li><Link to="/found-lost">Found & Lost</Link></li>
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

export default VetDirectory;