import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutContactFAQ.css';

const AboutContactFAQ = ({ page }) => {
  // State for contact form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // State for donation form
  const [donationForm, setDonationForm] = useState({
    amount: '',
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(page || 'about');
  const [donationSuccess, setDonationSuccess] = useState(false);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Founder & Director',
      bio: 'With over 15 years of experience in animal welfare, Sarah founded Paws Haven to create a safe space for abandoned pets.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Veterinary Director',
      bio: 'Dr. Chen oversees all medical care at our shelter and ensures each animal receives the best possible treatment.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Adoption Coordinator',
      bio: 'Emily matches pets with their perfect forever families through our thorough adoption process.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e'
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'How can I adopt a pet from Paws Haven?',
      answer: 'Our adoption process begins with an online application, followed by a meet-and-greet with the pet, home check, and finalization paperwork.'
    },
    {
      question: 'What are your operating hours?',
      answer: 'We are open Tuesday through Sunday from 10am to 6pm. Closed on Mondays for deep cleaning and staff training.'
    },
    {
      question: 'Do you accept surrendered pets?',
      answer: 'Yes, by appointment only. Please contact us to discuss your situation and schedule a surrender appointment.'
    },
    {
      question: 'How are donations used?',
      answer: '100% of donations go directly to animal care including food, medical treatment, shelter maintenance, and adoption programs.'
    },
    {
      question: 'Can I volunteer at Paws Haven?',
      answer: 'Absolutely! We welcome volunteers age 16 and older. Visit our volunteer page to apply and view available opportunities.'
    }
  ];

  // Handle contact form changes
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };

  // Handle donation form changes
  const handleDonationChange = (e) => {
    const { name, value } = e.target;
    setDonationForm({
      ...donationForm,
      [name]: value
    });
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting your message. Please try again later.');
    }
  };

  // Handle donation form submission
  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/donations/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationForm),
      });

      const data = await response.json();

      if (data.success) {
        setDonationSuccess(true);
        setDonationForm({
          amount: '',
          name: '',
          email: '',
          message: ''
        });
      } else {
        alert(data.message || 'There was an error processing your donation.');
      }
    } catch (error) {
      console.error('Donation error:', error);
      alert('An error occurred while processing your donation. Please try again.');
    }
  };

  // Render About content
  const renderAbout = () => (
    <div className="about-section">
      <h2>Our Mission</h2>
      <p className="mission-statement">
        At Paws Haven, we believe every pet deserves a loving home. Our mission is to rescue, rehabilitate, 
        and rehome abandoned and neglected animals while promoting responsible pet ownership through 
        education and community outreach.
      </p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>1,200+</h3>
          <p>Pets Rescued</p>
        </div>
        <div className="stat-card">
          <h3>800+</h3>
          <p>Successful Adoptions</p>
        </div>
        <div className="stat-card">
          <h3>150+</h3>
          <p>Volunteers</p>
        </div>
        <div className="stat-card">
          <h3>24/7</h3>
          <p>Emergency Care</p>
        </div>
      </div>
      
      <h2>Our Team</h2>
      <div className="team-grid">
        {teamMembers.map(member => (
          <div key={member.id} className="team-card">
            <div className="team-image">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="team-info">
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-bio">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Contact content
  const renderContact = () => (
    <div className="contact-section">
      <div className="contact-info">
        <h2>Get In Touch</h2>
        <div className="info-card">
          <h3>Visit Us</h3>
          <p>123 Shelter Way, Petville, NY 10001</p>
        </div>
        <div className="info-card">
          <h3>Call Us</h3>
          <p>General Inquiries: (555) 123-4567</p>
          <p>Emergency: (555) 987-6543</p>
        </div>
        <div className="info-card">
          <h3>Email Us</h3>
          <p>General: info@pawshaven.org</p>
          <p>Adoptions: adoptions@pawshaven.org</p>
        </div>
      </div>
      
      <div className="contact-form-container">
        <h2>Send Us a Message</h2>
        {isSubmitted ? (
          <div className="success-message">
            <p>Thank you for your message! We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleContactChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                rows="5"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );

  // Render FAQ content
  const renderFAQ = () => (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Donation content
  const renderDonation = () => (
    <div className="donation-section">
      <div className="donation-content">
        <h2>Support Our Mission</h2>
        <p>
          Your generous donation helps us provide food, medical care, and shelter to animals in need. 
          Every dollar makes a difference in an animal's life.
        </p>
        
        <div className="donation-options">
          <div className="donation-option">
            <h3>$25</h3>
            <p>Provides food for one pet for a week</p>
            <button 
              className="btn btn-secondary"
              onClick={() => setDonationForm({...donationForm, amount: '25'})}
            >
              Donate $25
            </button>
          </div>
          <div className="donation-option">
            <h3>$50</h3>
            <p>Covers basic vaccinations for one pet</p>
            <button 
              className="btn btn-secondary"
              onClick={() => setDonationForm({...donationForm, amount: '50'})}
            >
              Donate $50
            </button>
          </div>
          <div className="donation-option">
            <h3>$100</h3>
            <p>Sponsors a spay/neuter surgery</p>
            <button 
              className="btn btn-secondary"
              onClick={() => setDonationForm({...donationForm, amount: '100'})}
            >
              Donate $100
            </button>
          </div>
        </div>
      </div>
      
      <div className="donation-form-container">
        <h2>Make a Donation</h2>
        {donationSuccess ? (
          <div className="success-message">
            <p>Thank you for your donation! Your support helps us save lives.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setDonationSuccess(false)}
            >
              Make Another Donation
            </button>
          </div>
        ) : (
          <form onSubmit={handleDonationSubmit} className="donation-form">
            <div className="form-group">
              <label htmlFor="amount">Amount ($)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                min="1"
                value={donationForm.amount}
                onChange={handleDonationChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Your Name (Optional)</label>
              <input
                type="text"
                id="name"
                name="name"
                value={donationForm.name}
                onChange={handleDonationChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email (Optional)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={donationForm.email}
                onChange={handleDonationChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={donationForm.message}
                onChange={handleDonationChange}
                rows="3"
              />
            </div>
            <button type="submit" className="btn btn-primary">Donate Now</button>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <div className="about-contact-page">
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
            <Link to="/about" className={activeTab === 'about' ? 'active' : ''}>About</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </nav>

      <div className="page-tabs">
        <div className="container">
          <button 
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About Us
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact
          </button>
          <button 
            className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            FAQs
          </button>
          <button 
            className={`tab-btn ${activeTab === 'donate' ? 'active' : ''}`}
            onClick={() => setActiveTab('donate')}
          >
            Donate
          </button>
        </div>
      </div>

      <main className="main-content">
        <div className="container">
          {activeTab === 'about' && renderAbout()}
          {activeTab === 'contact' && renderContact()}
          {activeTab === 'faq' && renderFAQ()}
          {activeTab === 'donate' && renderDonation()}
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

export default AboutContactFAQ;