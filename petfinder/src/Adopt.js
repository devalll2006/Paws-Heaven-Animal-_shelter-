import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Adopt.css';

const Adopt = () => {
  // Sample pet data with proper image URLs
  const allPets = [
    {
      id: 1,
      name: 'Buddy',
      type: 'Dog',
      breed: 'Labrador Retriever',
      age: '3 years',
      location: 'New York',
      description: 'Friendly and energetic lab who loves playing fetch.',
      image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Cat',
      breed: 'Siamese Mix',
      age: '2 years',
      location: 'Chicago',
      description: 'Gentle and affectionate cat who enjoys cuddles.',
      image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      name: 'Rocky',
      type: 'Dog',
      breed: 'Terrier Mix',
      age: '4 years',
      location: 'Los Angeles',
      description: 'Loyal and protective companion with lots of love to give.',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      name: 'Milo',
      type: 'Cat',
      breed: 'Domestic Shorthair',
      age: '1 year',
      location: 'New York',
      description: 'Playful kitten who is always curious about his surroundings.',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 5,
      name: 'Bella',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: '5 years',
      location: 'Chicago',
      description: 'Sweet-natured and great with children and other pets.',
      image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 6,
      name: 'Charlie',
      type: 'Dog',
      breed: 'Beagle',
      age: '2 years',
      location: 'Boston',
      description: 'Cheerful and curious with a great sense of smell.',
      image: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 7,
      name: 'Lucy',
      type: 'Cat',
      breed: 'Persian',
      age: '3 years',
      location: 'Seattle',
      description: 'Calm and elegant cat who enjoys a quiet environment.',
      image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 8,
      name: 'Max',
      type: 'Dog',
      breed: 'German Shepherd',
      age: '4 years',
      location: 'Austin',
      description: 'Intelligent and protective, great for active families.',
      image: 'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ];

  // State for filters
  const [filters, setFilters] = useState({
    type: '',
    breed: '',
    age: '',
    location: ''
  });

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 6;

  // Get unique values for filter options
  const petTypes = ['', ...new Set(allPets.map(pet => pet.type))];
  const petBreeds = ['', ...new Set(allPets.map(pet => pet.breed))];
  const petAges = ['', ...new Set(allPets.map(pet => pet.age))];
  const petLocations = ['', ...new Set(allPets.map(pet => pet.location))];

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
    setCurrentPage(1);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      type: '',
      breed: '',
      age: '',
      location: ''
    });
    setCurrentPage(1);
    document.getElementById('type').value = '';
    document.getElementById('breed').value = '';
    document.getElementById('age').value = '';
    document.getElementById('location').value = '';
  };

  // Filter pets based on selected filters
  const filteredPets = allPets.filter(pet => {
    return (
      (filters.type === '' || pet.type === filters.type) &&
      (filters.breed === '' || pet.breed === filters.breed) &&
      (filters.age === '' || pet.age === filters.age) &&
      (filters.location === '' || pet.location === filters.location)
    );
  });

  // Get current pets for pagination
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="adopt-page">
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
            <Link to="/adopt" className="active">Adopt</Link>
            <Link to="/found-lost">Found & Lost</Link>
            <Link to="/vets">Vets</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </nav>

      <main className="adopt-main">
        <div className="container">
          <h1 className="page-title">Find Your Perfect Pet</h1>
          
          <div className="filters-section">
            <div className="filter-row">
              <div className="filter-group">
                <label htmlFor="type">Type</label>
                <select 
                  id="type" 
                  name="type" 
                  value={filters.type}
                  onChange={handleFilterChange}
                >
                  {petTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type === '' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label htmlFor="breed">Breed</label>
                <select 
                  id="breed" 
                  name="breed" 
                  value={filters.breed}
                  onChange={handleFilterChange}
                >
                  {petBreeds.map((breed, index) => (
                    <option key={index} value={breed}>
                      {breed === '' ? 'All Breeds' : breed}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="filter-row">
              <div className="filter-group">
                <label htmlFor="age">Age</label>
                <select 
                  id="age" 
                  name="age" 
                  value={filters.age}
                  onChange={handleFilterChange}
                >
                  {petAges.map((age, index) => (
                    <option key={index} value={age}>
                      {age === '' ? 'All Ages' : age}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label htmlFor="location">Location</label>
                <select 
                  id="location" 
                  name="location" 
                  value={filters.location}
                  onChange={handleFilterChange}
                >
                  {petLocations.map((location, index) => (
                    <option key={index} value={location}>
                      {location === '' ? 'All Locations' : location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <button 
              className="reset-filters-btn"
              onClick={resetFilters}
            >
              Reset All Filters
            </button>
          </div>
          
          <div className="results-count">
            {filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'} found
          </div>
          
          <div className="pets-grid">
            {currentPets.length > 0 ? (
              currentPets.map(pet => (
                <div key={pet.id} className="pet-card">
                  <div className="pet-image">
                    <img src={pet.image} alt={pet.name} />
                  </div>
                  <div className="pet-info">
                    <h3>{pet.name}</h3>
                    <p><strong>Type:</strong> {pet.type}</p>
                    <p><strong>Breed:</strong> {pet.breed}</p>
                    <p><strong>Age:</strong> {pet.age}</p>
                    <p><strong>Location:</strong> {pet.location}</p>
                    <p className="pet-description">{pet.description}</p>
                    <div className="pet-button-wrapper">
                      <Link to={`/pets/${pet.id}`} className="btn btn-primary">
                        Meet {pet.name}
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No pets match your current filters. Try adjusting your search criteria.</p>
                <button 
                  className="btn btn-primary"
                  onClick={resetFilters}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
          
          {filteredPets.length > petsPerPage && (
            <div className="pagination">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                &laquo; Previous
              </button>
              
              {Array.from({ length: Math.ceil(filteredPets.length / petsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === Math.ceil(filteredPets.length / petsPerPage)}
                className="pagination-btn"
              >
                Next &raquo;
              </button>
            </div>
          )}
        </div>
      </main>

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

export default Adopt;