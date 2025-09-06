import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Found my perfect companion through this shelter!",
      author: "Sarah Johnson"
    },
    {
      id: 2,
      quote: "The adoption process was smooth and the staff was wonderful.",
      author: "Michael Chen"
    },
    {
      id: 3,
      quote: "Our family is complete thanks to Paws Haven!",
      author: "The Rodriguez Family"
    }
  ];
  
  // Sample data
  const featuredPets = [
    {
      id: 1,
      name: 'Buddy',
      type: 'Dog',
      breed: 'Labrador Retriever',
      age: '3 years',
      image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80'
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Cat',
      breed: 'Siamese Mix',
      age: '2 years',
      image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13'
    },
    {
      id: 3,
      name: 'Rocky',
      type: 'Dog',
      breed: 'Terrier Mix',
      age: '4 years',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d'
    }
  ];

  // Typewriter effect state
  const [displayText, setDisplayText] = useState('');
  const fullText = "Find Your Furry Friend";
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Typewriter effect logic
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + fullText[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100); // Typing speed (100ms per character)

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);


  return (
    <div className="animal-shelter-homepage">
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
            <Link to="/Adopt">Adopt</Link>
            <Link to="/found-lost">Found & Lost</Link>
            <Link to="/vets">Vets</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Typewriter Effect */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>
              {displayText}
              <span className="cursor">|</span>
            </h1>
            <p>Connecting loving homes with pets in need</p>
            <div className="hero-buttons">
              <Link to="/adopt" className="btn btn-primary">Adopt a Pet</Link>
              <Link to="/found-lost" className="btn btn-secondary">Report Lost Pet</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="featured-pets py-5">
        <div className="container">
          <h2 className="section-title">Featured Pets</h2>
          <div className="pets-grid">
            {featuredPets.map(pet => (
              <div key={pet.id} className="pet-card">
                <div className="pet-image">
                  <img src={pet.image} alt={pet.name} />
                </div>
                <div className="pet-info">
                  <h3>{pet.name}</h3>
                  <p><strong>Type:</strong> {pet.type}</p>
                  <p><strong>Breed:</strong> {pet.breed}</p>
                  <p><strong>Age:</strong> {pet.age}</p>
                  <Link to={`/pets/${pet.id}`} className="btn btn-outline">
                    Meet {pet.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="statistics py-5 bg-light">
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>1,200+</h3>
              <p>Pets Saved</p>
            </div>
            <div className="stat-card">
              <h3>800+</h3>
              <p>Happy Families</p>
            </div>
            <div className="stat-card">
              <h3>150+</h3>
              <p>Volunteers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="testimonials py-5">
        <div className="container">
          <h2 className="section-title">Happy Stories</h2>
          <div className="carousel">
            <div className="carousel-inner" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="quote">"{testimonial.quote}"</div>
                  <div className="author">- {testimonial.author}</div>
                </div>
              ))}
            </div>
            <div className="carousel-controls">
              <button 
                onClick={() => setCurrentTestimonial((prev) => 
                  prev === 0 ? testimonials.length - 1 : prev - 1
                )}
                className="carousel-btn"
              >
                &lt;
              </button>
              <div className="carousel-dots">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setCurrentTestimonial((prev) => 
                  prev === testimonials.length - 1 ? 0 : prev + 1
                )}
                className="carousel-btn"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </section>

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

export default HomePage;