import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  // Sample blog post data
  const allPosts = [
    {
      id: 1,
      title: '10 Tips for First-Time Pet Owners',
      author: 'Dr. Sarah Johnson',
      date: 'May 15, 2023',
      excerpt: 'Bringing home a new pet is exciting but can be overwhelming. Here are 10 essential tips to help you and your new companion get off to a great start.',
      category: 'Pet Care',
      image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Understanding Your Cat\'s Behavior',
      author: 'Dr. Emily Rodriguez',
      date: 'April 28, 2023',
      excerpt: 'Cats communicate in mysterious ways. Learn to decode your feline friend\'s body language and vocalizations to strengthen your bond.',
      category: 'Cat Behavior',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'The Importance of Regular Vet Checkups',
      author: 'Dr. Michael Chen',
      date: 'April 10, 2023',
      excerpt: 'Preventive care is key to your pet\'s long-term health. Discover what happens during a routine checkup and why they matter.',
      category: 'Health',
      image: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19',
      readTime: '4 min read'
    },
    {
      id: 4,
      title: 'Dog Training: Positive Reinforcement Techniques',
      author: 'John Peterson',
      date: 'March 22, 2023',
      excerpt: 'Effective training builds a happy relationship with your dog. Explore positive reinforcement methods that really work.',
      category: 'Training',
      image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530',
      readTime: '8 min read'
    },
    {
      id: 5,
      title: 'Creating a Pet-Friendly Home',
      author: 'Lisa Williams',
      date: 'March 5, 2023',
      excerpt: 'Make your living space safe and comfortable for your pets with these simple home modifications and safety tips.',
      category: 'Pet Care',
      image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80',
      readTime: '6 min read'
    },
    {
      id: 6,
      title: 'Nutrition Guide for Senior Dogs',
      author: 'Dr. Sarah Johnson',
      date: 'February 18, 2023',
      excerpt: 'As dogs age, their nutritional needs change. Learn how to adjust your senior dog\'s diet for optimal health.',
      category: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e',
      readTime: '5 min read'
    }
  ];

  // State for filters
  const [filters, setFilters] = useState({
    category: '',
    author: ''
  });

  // State for search
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for newsletter subscription
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  // Get unique values for filter options
  const categories = ['All Categories', ...new Set(allPosts.map(post => post.category))];
  const authors = ['All Authors', ...new Set(allPosts.map(post => post.author))];

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value === 'All Categories' || value === 'All Authors' ? '' : value
    });
  };

  // Handle search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle newsletter subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscriptionMessage('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionMessage('Please enter a valid email address.');
      setIsSubscribing(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setSubscriptionMessage('Successfully subscribed! You\'ll receive our latest blog updates.');
        setEmail('');
      } else {
        setSubscriptionMessage(data.message || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      if (error.message.includes('Failed to fetch')) {
        setSubscriptionMessage('Unable to connect to server. Please check if the server is running.');
      } else {
        setSubscriptionMessage('An error occurred. Please try again later.');
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  // Filter posts based on selected filters and search query
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = filters.category === '' || post.category === filters.category;
    const matchesAuthor = filters.author === '' || post.author === filters.author;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesAuthor && matchesSearch;
  });

  return (
    <div className="blog-page">
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
            <Link to="/found-lost">Found & Lost</Link>
            <Link to="/vets">Vets</Link>
            <Link to="/blog" className="active">Blog</Link>
            <Link to="/about">About</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="blog-main">
        <div className="container">
          <div className="blog-header">
            <h1 className="page-title">Paws Haven Blog</h1>
            <p className="page-subtitle">Expert advice and heartwarming stories for pet lovers</p>
          </div>

          {/* Search and Filters */}
          <div className="blog-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <i className="bi bi-search"></i>
            </div>

            <div className="blog-filters">
              <div className="filter-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={filters.category || 'All Categories'}
                  onChange={handleFilterChange}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="author">Author</label>
                <select
                  id="author"
                  name="author"
                  value={filters.author || 'All Authors'}
                  onChange={handleFilterChange}
                >
                  {authors.map((author, index) => (
                    <option key={index} value={author}>{author}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="results-count">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
          </div>

          {/* Blog Posts Grid */}
          <div className="posts-grid">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <div key={post.id} className="post-card">
                  <div className="post-image">
                    <img src={post.image} alt={post.title} />
                    <div className="post-category">{post.category}</div>
                  </div>
                  <div className="post-content">
                    <div className="post-meta">
                      <span className="post-author">{post.author}</span>
                      <span className="post-date">{post.date}</span>
                      <span className="post-read-time">{post.readTime}</span>
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="read-more">
                      Read More <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No blog posts match your current filters. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>

          {/* Newsletter Subscription */}
          <div className="newsletter-section">
            <div className="newsletter-content">
              <h3>Stay Updated with Our Latest Posts</h3>
              <p>Subscribe to our newsletter for regular pet care tips and updates</p>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="btn btn-primary" disabled={isSubscribing}>
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {subscriptionMessage && (
                <p className={`subscription-message ${subscriptionMessage.includes('success') ? 'success' : 'error'}`}>
                  {subscriptionMessage}
                </p>
              )}
            </div>
          </div>
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

export default Blog;