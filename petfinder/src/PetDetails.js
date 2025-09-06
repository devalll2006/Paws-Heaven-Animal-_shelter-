import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './PetDetails.css';



const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
    
    // Listen for storage changes (when user logs in from another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Function to handle authentication check
  const handleAdoptClick = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      window.location.href = '/login';
    } else {
      setShowAdoptionForm(true);
    }
  };
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    homeType: '',
    otherPets: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sample pet data - in production, fetch from API
  const pets = [
    {
      id: 1,
      name: 'Buddy',
      type: 'Dog',
      breed: 'Labrador Retriever',
      age: '3 years',
      gender: 'Male',
      size: 'Large',
      color: 'Golden',
      location: 'New York Shelter',
      description: 'Buddy is a friendly and energetic Labrador who loves playing fetch and going for long walks. He gets along well with children and other dogs. Buddy is fully vaccinated and neutered.',
      personality: ['Friendly', 'Playful', 'Good with kids', 'Loves water'],
      needs: ['Regular exercise', 'Grooming every 2 weeks', 'Large living space'],
      image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80',
      additionalImages: [
        'https://images.unsplash.com/photo-1561037404-61cd46aa615b',
        'https://images.unsplash.com/photo-1544568100-847a948585b9'
      ]
    },
     {
      id: 2,
      name: 'Luna',
      type: 'Cat',
      breed: 'Siamese Mix',
      age: '2 years',
      gender: 'Female',
      size: 'Medium',
      color: 'Cream with brown points',
      location: 'Chicago Shelter',
      description: 'Luna is a gentle and affectionate cat who enjoys cuddles and quiet evenings. She has beautiful blue eyes and a soft voice. Luna is litter-trained and gets along with other cats.',
      personality: ['Gentle', 'Affectionate', 'Quiet', 'Curious'],
      needs: ['Regular brushing', 'Quiet environment', 'Interactive toys'],
      image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13',
      additionalImages: [
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
        'https://images.unsplash.com/photo-1533738363-b7f9aef128ce'
      ]
    },
    {
      id: 3,
      name: 'Rocky',
      type: 'Dog',
      breed: 'Terrier Mix',
      age: '4 years',
      gender: 'Male',
      size: 'Medium',
      color: 'Black and tan',
      location: 'Los Angeles Shelter',
      description: 'Rocky is a loyal and protective companion with lots of love to give. He is house-trained and knows basic commands. Rocky would do best as the only pet in an adult household.',
      personality: ['Loyal', 'Protective', 'Intelligent', 'Energetic'],
      needs: ['Daily walks', 'Mental stimulation', 'Experienced owner'],
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
      additionalImages: [
        'https://images.unsplash.com/photo-1583511655826-05700442b31',
        'https://images.unsplash.com/photo-1583511655857-d19b40a7a54'
      ]
    },
    {
      id: 4,
      name: 'Milo',
      type: 'Cat',
      breed: 'Domestic Shorthair',
      age: '1 year',
      gender: 'Male',
      size: 'Small',
      color: 'Orange tabby',
      location: 'New York Feline Rescue',
      description: 'Milo is a playful and curious kitten who loves exploring his surroundings. He is full of energy and enjoys interactive toys. Milo would thrive in an active household where he can climb, chase, and satisfy his natural curiosity.',
      personality: ['Playful', 'Curious', 'Affectionate', 'Energetic'],
      needs: ['Interactive toys', 'Scratching posts', 'Vertical space'],
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
      additionalImages: [
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
        'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13'
      ]
    },
    {
      id: 5,
      name: 'Bella',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: '5 years',
      gender: 'Female',
      size: 'Large',
      color: 'Golden',
      location: 'Chicago Humane Society',
      description: 'Bella is a sweet-natured golden retriever who is wonderful with children and other pets. She has a calm demeanor and loves nothing more than cuddling with her humans. Bella is already trained and would be perfect for a family looking for a gentle giant.',
      personality: ['Gentle', 'Loving', 'Patient', 'Loyal'],
      needs: ['Regular grooming', 'Moderate exercise', 'Family time'],
      image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530',
      additionalImages: [
        'https://images.unsplash.com/photo-1505628346881-b72b27e84530',
        'https://images.unsplash.com/photo-1589941013456-47c3ea48eb3e'
      ]
    },
    {
      id: 6,
      name: 'Charlie',
      type: 'Dog',
      breed: 'Beagle',
      age: '2 years',
      gender: 'Male',
      size: 'Small to Medium',
      color: 'Tri-color (black, white, and tan)',
      location: 'Boston Animal Rescue',
      description: 'Charlie is a cheerful and curious beagle with an excellent sense of smell. He loves following scents and would make a great companion for outdoor adventures. He gets along well with other dogs and has a gentle nature with children.',
      personality: ['Friendly', 'Curious', 'Playful', 'Vocal'],
      needs: ['Secure fencing', 'Regular exercise', 'Scent games'],
      image: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19',
      additionalImages: [
        'https://images.unsplash.com/photo-1601758003443-8b5dcdca5368',
        'https://images.unsplash.com/photo-1601758003824-50ae3f579857'
      ]
    },
    {
  id: 7,
  name: "Lucy",
  type: "Cat",
  breed: "Persian",
  age: "3 years",
  gender: "Female",
  size: "Large",
  color: "Golden",
  location: "Seattle",
  description: "Lucy is a playful and energetic dog who loves outdoor adventures. She is great with kids and other dogs, making her a perfect family pet. Lucy knows basic commands and is house-trained.",
  personality: ["Friendly", "Energetic", "Loyal", "Playful"],
  needs: ["Daily exercise", "Mental stimulation", "Regular grooming"],
  image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80",
  additionalImages: [
    "https://images.unsplash.com/photo-1544568100-847a948585b9",
    "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3"
  ]
},
{
  id: 8,
  name: "Max",
  type: "Dog",
  breed: "German Shepherd",
  age: "4 years",
  gender: "Male",
  size: "Medium",
  color: "Tri-color (black, white, brown)",
  location: "Austin",
  description: "Max is a sweet and curious dog with a great sense of smell. He loves sniffing around on walks and cuddling afterward. Max is good with other dogs but may chase small animals due to his hunting instincts.",
  personality: ["Curious", "Affectionate", "Playful", "Independent"],
  needs: ["Secure leash walks", "Scent games", "Moderate exercise"],
  image: "https://images.unsplash.com/photo-1601758003122-53c40e686a19",
  additionalImages: [
    "https://images.unsplash.com/photo-1505628346881-b72b27e84530",
    "https://images.unsplash.com/photo-1589941013455-a58137a6a998"
  ]
}
    // Add all other pets here...
  ];

  const pet = pets.find(p => p.id === parseInt(id));

   const verifyPetExists = async (petId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pets/${petId}/exists`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error verifying pet:', error);
      return false; // Assume pet doesn't exist if there's an error
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('http://localhost:5000/api/adopt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        petId: pet.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        homeType: formData.homeType,
        experience: formData.experience,
        otherPets: formData.otherPets,
        message: formData.message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Enhanced error message showing backend validation errors
      throw new Error(data.error || `Failed to submit application for ${pet.name}`);
    }

    setSubmitSuccess(true);
    setShowAdoptionForm(false);
  } catch (error) {
    console.error('Adoption error:', error);
    alert(`Error adopting ${pet.name}: ${error.message}`);
  } finally {
    setIsSubmitting(false);
  }
};
  if (!pet) {
    return (
      <div className="pet-details-page">
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="navbar-brand">Paws Haven</Link>
            <div className="navbar-links">
              <Link to="/">Home</Link>
              <Link to="/adopt">Adopt</Link>
              <Link to="/found-lost">Found & Lost</Link>
              <Link to="/vets">Vets</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/about">About</Link>
              <Link to="/login" className="login-btn">Login</Link>
            </div>
          </div>
        </nav>

        <main className="pet-details-main">
          <div className="container">
            <div className="not-found">
              <h2>Pet Not Found</h2>
              <p>The pet you're looking for doesn't exist or has been adopted.</p>
              <Link to="/adopt" className="btn btn-primary">Browse Available Pets</Link>
            </div>
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
  }

  if (submitSuccess) {
    return (
      <div className="pet-details-page">
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="navbar-brand">Paws Haven</Link>
            <div className="navbar-links">
              <Link to="/">Home</Link>
              <Link to="/adopt">Adopt</Link>
              <Link to="/found-lost">Found & Lost</Link>
              <Link to="/vets">Vets</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/about">About</Link>
              <Link to="/login" className="login-btn">Login</Link>
            </div>
          </div>
        </nav>

        <main className="pet-details-main">
          <div className="container">
            <div className="adoption-success">
              <h2>Application Submitted Successfully!</h2>
              <div className="success-message">
                <p>Thank you for your interest in adopting {pet.name}!</p>
                <p>We've received your application and will review it shortly.</p>
                <p>Our team will contact you within 3 business days to discuss next steps.</p>
              </div>
              <div className="success-actions">
                <Link to="/adopt" className="btn btn-primary">
                  Browse More Pets
                </Link>
                <Link to="/" className="btn btn-secondary">
                  Return Home
                </Link>
              </div>
            </div>
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
  }

  return (
    <div className="pet-details-page">
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
            <Link to="/vets">Vets</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </nav>

      <main className="pet-details-main">
        <div className="container">
          <div className="pet-details-header">
            <h1>Meet {pet.name}</h1>
            <p className="pet-breed">{pet.breed} {pet.type}</p>
          </div>

          <div className="pet-details-content">
            <div className="pet-gallery">
              <div className="main-image">
                <img src={pet.image} alt={pet.name} />
              </div>
              <div className="thumbnail-grid">
                {pet.additionalImages.map((img, index) => (
                  <div key={index} className="thumbnail">
                    <img src={img} alt={`${pet.name} ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="pet-info">
              <div className="pet-meta">
                <div className="meta-item">
                  <span className="meta-label">Age</span>
                  <span className="meta-value">{pet.age}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Gender</span>
                  <span className="meta-value">{pet.gender}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Size</span>
                  <span className="meta-value">{pet.size}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Color</span>
                  <span className="meta-value">{pet.color}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Location</span>
                  <span className="meta-value">{pet.location}</span>
                </div>
              </div>

              <div className="pet-description">
                <h3>About {pet.name}</h3>
                <p>{pet.description}</p>
              </div>

              <div className="pet-traits">
                <div className="traits-column">
                  <h4>Personality</h4>
                  <ul>
                    {pet.personality.map((trait, index) => (
                      <li key={index}>{trait}</li>
                    ))}
                  </ul>
                </div>
                <div className="traits-column">
                  <h4>Special Needs</h4>
                  <ul>
                    {pet.needs.map((need, index) => (
                      <li key={index}>{need}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pet-actions">
                <Link to="/adopt" className="btn btn-secondary">
                  Back to All Pets
                </Link>
                <button 
                  className="btn btn-primary"
                  onClick={handleAdoptClick}
                >
                  Start Adoption Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showAdoptionForm && (
        <div className="adoption-form-modal">
          <div className="adoption-form-container">
            <button 
              className="close-btn"
              onClick={() => setShowAdoptionForm(false)}
              disabled={isSubmitting}
            >
              &times;
            </button>
            
            <h2>Adopt {pet.name}</h2>
            <p className="form-subtitle">Please fill out this form to apply for adoption</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="homeType">Type of Home</label>
                <select
                  id="homeType"
                  name="homeType"
                  value={formData.homeType}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="experience">Previous Pet Experience</label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Tell us about any pets you've had before"
                />
              </div>

              <div className="form-group">
                <label htmlFor="otherPets">Other Pets in Household</label>
                <textarea
                  id="otherPets"
                  name="otherPets"
                  value={formData.otherPets}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="List any current pets you have"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Why do you want to adopt {pet.name}?</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAdoptionForm(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

export default PetDetails;