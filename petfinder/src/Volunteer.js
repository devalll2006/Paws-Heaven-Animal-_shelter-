import React from 'react';
import { Link } from 'react-router-dom';
import './Volunteer.css';

const Volunteer = () => {

  return (
    <div className="volunteer-page">
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
            <Link to="/vets">Vets</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="volunteer-hero">
        <div className="container">
          <h1>Volunteer with Paws Haven</h1>
          <p>Make a difference in the lives of animals in need</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="volunteer-main">
        <div className="container">
          {/* Why Volunteer Section */}
          <section className="why-volunteer">
            <h2>Why Volunteer?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <i className="bi bi-heart-fill"></i>
                <h3>Make a Difference</h3>
                <p>Help animals find loving homes and provide them with care they deserve.</p>
              </div>
              <div className="benefit-card">
                <i className="bi bi-people-fill"></i>
                <h3>Meet Like-minded People</h3>
                <p>Connect with fellow animal lovers and build lasting friendships.</p>
              </div>
              <div className="benefit-card">
                <i className="bi bi-star-fill"></i>
                <h3>Gain Experience</h3>
                <p>Develop new skills and gain valuable experience working with animals.</p>
              </div>
            </div>
          </section>

          {/* Volunteer Opportunities */}
          <section className="opportunities">
            <h2>Volunteer Opportunities</h2>
            <div className="opportunities-grid">
              <div className="opportunity-card">
                <h3>Animal Care</h3>
                <p>Help with feeding, grooming, and providing daily care for our animals.</p>
                <ul>
                  <li>Feed and water animals</li>
                  <li>Clean kennels and cages</li>
                  <li>Exercise dogs</li>
                  <li>Socialize cats and dogs</li>
                </ul>
              </div>
              <div className="opportunity-card">
                <h3>Administrative Support</h3>
                <p>Assist with office tasks and help keep our operations running smoothly.</p>
                <ul>
                  <li>Answer phones and emails</li>
                  <li>Data entry and filing</li>
                  <li>Process adoption applications</li>
                  <li>Update social media</li>
                </ul>
              </div>
              <div className="opportunity-card">
                <h3>Event Support</h3>
                <p>Help organize and run adoption events and fundraising activities.</p>
                <ul>
                  <li>Set up adoption events</li>
                  <li>Assist at fundraising events</li>
                  <li>Help with community outreach</li>
                  <li>Photography and promotion</li>
                </ul>
              </div>
              <div className="opportunity-card">
                <h3>Foster Care</h3>
                <p>Provide temporary homes for animals who need extra care.</p>
                <ul>
                  <li>Foster puppies and kittens</li>
                  <li>Care for sick or injured animals</li>
                  <li>Help with pregnant animals</li>
                  <li>Provide socialization</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Requirements */}
          <section className="requirements">
            <h2>Volunteer Requirements</h2>
            <div className="requirements-content">
              <div className="requirement-item">
                <h3>Age Requirement</h3>
                <p>Volunteers must be at least 16 years old. Volunteers under 18 need parental consent.</p>
              </div>
              <div className="requirement-item">
                <h3>Time Commitment</h3>
                <p>We ask for a minimum commitment of 2 hours per week for at least 3 months.</p>
              </div>
              <div className="requirement-item">
                <h3>Training</h3>
                <p>All volunteers must complete our orientation and training program before starting.</p>
              </div>
              <div className="requirement-item">
                <h3>Background Check</h3>
                <p>A background check is required for all volunteers working directly with animals.</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="contact-info">
            <h2>Get in Touch</h2>
            <div className="contact-content">
              <p>For volunteer opportunities and more information, please contact us directly:</p>
              <div className="contact-details">
                <div className="contact-item">
                  <h3>Phone</h3>
                  <p>(555) 123-4567</p>
                </div>
                <div className="contact-item">
                  <h3>Email</h3>
                  <p>volunteer@pawshaven.org</p>
                </div>
                <div className="contact-item">
                  <h3>Address</h3>
                  <p>123 Shelter Way, Petville</p>
                </div>
              </div>
            </div>
          </section>
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

export default Volunteer;