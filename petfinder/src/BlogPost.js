import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();

  // Sample blog post data - in a real app, this would come from an API
  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for First-Time Pet Owners',
      author: 'Dr. Sarah Johnson',
      date: 'May 15, 2023',
      excerpt: 'Bringing home a new pet is exciting but can be overwhelming. Here are 10 essential tips to help you and your new companion get off to a great start.',
      category: 'Pet Care',
      image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80',
      readTime: '5 min read',
      content: `
        <h2>Getting Started with Your New Pet</h2>
        <p>Bringing a new pet into your home is a wonderful experience, but it requires preparation and patience. Whether you're adopting a puppy, kitten, or an adult animal, these tips will help ensure a smooth transition.</p>
        
        <h3>1. Prepare Your Home</h3>
        <p>Before your pet arrives, pet-proof your home. Remove hazardous items, secure electrical cords, and create a safe space for your new companion.</p>
        
        <h3>2. Gather Essential Supplies</h3>
        <p>You'll need food and water bowls, quality food, a comfortable bed, toys, grooming tools, and a collar with ID tags.</p>
        
        <h3>3. Schedule a Vet Visit</h3>
        <p>Arrange a check-up within the first week to establish care and discuss vaccination schedules, spaying/neutering, and preventive medications.</p>
        
        <h3>4. Establish a Routine</h3>
        <p>Pets thrive on consistency. Set regular times for feeding, walks, playtime, and bathroom breaks.</p>
        
        <h3>5. Start Training Early</h3>
        <p>Begin basic training immediately using positive reinforcement techniques. Consistency is key to good behavior.</p>
        
        <h3>6. Socialize Your Pet</h3>
        <p>Gradually introduce your pet to new people, animals, and environments to build confidence and prevent fearfulness.</p>
        
        <h3>7. Be Patient with House Training</h3>
        <p>Accidents will happen. Maintain a schedule and reward successes rather than punishing mistakes.</p>
        
        <h3>8. Provide Mental Stimulation</h3>
        <p>Interactive toys, puzzle feeders, and training sessions will keep your pet engaged and prevent boredom.</p>
        
        <h3>9. Learn About Pet Nutrition</h3>
        <p>Consult your vet about appropriate food choices, portion sizes, and feeding schedules for your pet's age and breed.</p>
        
        <h3>10. Enjoy the Journey</h3>
        <p>Building a bond takes time. Cherish each milestone and the unique personality your pet brings to your life.</p>
        
        <p>Remember, every pet is different. What works for one may not work for another. Stay flexible, observant, and most importantly, enjoy the wonderful journey of pet ownership!</p>
      `,
      authorBio: 'Dr. Sarah Johnson is a veterinarian with 15 years of experience in small animal practice. She specializes in behavioral medicine and preventive care.'
    },
    {
      id: 2,
      title: 'Understanding Your Cat\'s Behavior',
      author: 'Dr. Emily Rodriguez',
      date: 'April 28, 2023',
      excerpt: 'Cats communicate in mysterious ways. Learn to decode your feline friend\'s body language and vocalizations to strengthen your bond.',
      category: 'Cat Behavior',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
      readTime: '7 min read',
      content: `
        <h2>Decoding Feline Communication</h2>
        <p>Cats have developed sophisticated ways to communicate their feelings and needs. Understanding these signals can greatly improve your relationship with your feline companion.</p>
        
        <h3>Tail Language</h3>
        <p>A cat's tail is like a mood barometer:</p>
        <ul>
          <li><strong>Straight up:</strong> Happy, confident greeting</li>
          <li><strong>Puffed up:</strong> Frightened or agitated</li>
          <li><strong>Low or tucked:</strong> Insecure or nervous</li>
          <li><strong>Slow swish:</strong> Focused, possibly hunting</li>
          <li><strong>Fast flick:</strong> Irritated or anxious</li>
        </ul>
        
        <h3>Ear Positions</h3>
        <p>Ears tell you what your cat is paying attention to and how they feel:</p>
        <ul>
          <li><strong>Forward:</strong> Alert and interested</li>
          <li><strong>Sideways or back:</strong> Nervous or irritated</li>
          <li><strong>Flat against head:</strong> Frightened or aggressive</li>
        </ul>
        
        <h3>Vocalizations</h3>
        <p>Cats have a wide vocabulary:</p>
        <ul>
          <li><strong>Meow:</strong> General greeting or request (varies by cat)</li>
          <li><strong>Purr:</strong> Usually contentment, but can indicate pain</li>
          <li><strong>Chirrup/trill:</strong> Friendly greeting</li>
          <li><strong>Hiss:</strong> Fear or aggression</li>
          <li><strong>Yowl:</strong> Distress or mating call</li>
        </ul>
        
        <h3>Common Behaviors Explained</h3>
        <p><strong>Kneading:</strong> A comforting behavior from kittenhood, often showing contentment.</p>
        <p><strong>Head-butting:</strong> A sign of affection and a way to mark you with scent glands.</p>
        <p><strong>Bringing "gifts":</strong> Your cat is sharing their hunting success or trying to teach you to hunt.</p>
        
        <p>Remember that each cat is an individual with unique ways of expressing themselves. Spend time observing your cat to learn their specific communication style.</p>
      `,
      authorBio: 'Dr. Emily Rodriguez is a feline behavior specialist with a PhD in animal behavior. She runs a successful cat behavior consulting practice.'
    },
    {
    id: 4,
    title: 'Dog Training Essentials: From Puppy to Adult',
    author: 'Mark Williams',
    date: 'June 10, 2023',
    excerpt: 'Effective training techniques for dogs of all ages. Learn how to build a strong foundation for obedience and good manners.',
    category: 'Dog Training',
    image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80',
    readTime: '8 min read',
    content: `
      <h2>Building a Well-Behaved Canine Companion</h2>
      <p>Training is essential for a happy relationship with your dog. These techniques will help you establish clear communication and mutual respect.</p>
      
      <h3>Basic Commands Every Dog Should Know</h3>
      <ul>
        <li><strong>Sit:</strong> The foundation for impulse control</li>
        <li><strong>Stay:</strong> Crucial for safety in various situations</li>
        <li><strong>Come:</strong> Potentially life-saving recall command</li>
        <li><strong>Leave it:</strong> Prevents picking up dangerous items</li>
        <li><strong>Down:</strong> Promotes calm behavior</li>
      </ul>
      
      <h3>Positive Reinforcement Techniques</h3>
      <p>Reward-based training is the most effective and humane approach:</p>
      <ul>
        <li>Use high-value treats for difficult commands</li>
        <li>Pair treats with verbal praise and petting</li>
        <li>Time rewards precisely (within 1-2 seconds of desired behavior)</li>
        <li>Gradually phase out food rewards as behavior becomes consistent</li>
      </ul>
      
      <h3>Addressing Common Behavior Issues</h3>
      <p><strong>Jumping:</strong> Teach an alternative behavior like sitting for greetings.</p>
      <p><strong>Barking:</strong> Identify the cause (alert, boredom, anxiety) before correcting.</p>
      <p><strong>Leash Pulling:</strong> Use front-clip harnesses and reward loose-leash walking.</p>
      <p><strong>Chewing:</strong> Provide appropriate chew toys and puppy-proof your home.</p>
      
      <h3>Advanced Training Concepts</h3>
      <p>Once basics are mastered, consider:</p>
      <ul>
        <li>Proofing commands in various environments</li>
        <li>Teaching fun tricks to strengthen your bond</li>
        <li>Participating in dog sports (agility, nose work, etc.)</li>
        <li>Therapy dog training if your dog has the right temperament</li>
      </ul>
      
      <p>Remember that training is an ongoing process throughout your dog's life. Short, frequent sessions (5-10 minutes) are more effective than long, infrequent ones.</p>
    `,
    authorBio: 'Mark Williams is a certified professional dog trainer (CPDT-KA) with over a decade of experience working with dogs of all breeds and temperaments.'
  },
  {
  id: 3,
  title: 'The Importance of Regular Vet Checkups',
  author: 'Dr. Michael Chen',
  date: 'April 10, 2023',
  excerpt: 'Preventive care is key to your pet\'s long-term health. Discover what happens during a routine checkup and why they matter.',
  category: 'Pet Health',
  image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee',
  readTime: '4 min read',
  content: `
    <h2>Why Routine Vet Visits Matter</h2>
    <p>Regular veterinary checkups are the cornerstone of preventive care, helping detect potential health issues before they become serious problems.</p>
    
    <h3>What Happens During a Wellness Exam</h3>
    <ul>
      <li><strong>Physical examination:</strong> Nose-to-tail assessment checking eyes, ears, skin, coat, teeth, and body condition</li>
      <li><strong>Weight monitoring:</strong> Tracking changes that might indicate health issues</li>
      <li><strong>Vital signs check:</strong> Heart rate, respiration, and temperature evaluation</li>
      <li><strong>Palpation:</strong> Feeling abdomen and joints for abnormalities</li>
      <li><strong>Dental assessment:</strong> Checking for tartar buildup, gum disease, or tooth decay</li>
    </ul>
    
    <h3>Recommended Checkup Frequency</h3>
    <p><strong>Puppies/Kittens:</strong> Every 3-4 weeks until 16 weeks old</p>
    <p><strong>Adult pets (1-7 years):</strong> Annual exams</p>
    <p><strong>Senior pets (7+ years):</strong> Every 6 months</p>
    
    <h3>Preventive Care Services</h3>
    <ul>
      <li>Vaccination updates</li>
      <li>Parasite prevention (fleas, ticks, heartworm)</li>
      <li>Blood work for early disease detection</li>
      <li>Nutrition and weight management counseling</li>
      <li>Behavioral assessments</li>
    </ul>
    
    <h3>Benefits of Regular Checkups</h3>
    <ul>
      <li>Early detection of diseases like diabetes, kidney issues, or arthritis</li>
      <li>Lower long-term healthcare costs through prevention</li>
      <li>Establishment of baseline health metrics</li>
      <li>Opportunity to discuss concerns with your vet</li>
      <li>Longer, healthier life for your pet</li>
    </ul>
    
    <p>Remember that pets age faster than humans, so annual exams are equivalent to you seeing a doctor every 4-5 years. Don't wait for visible symptoms - schedule regular checkups to keep your pet in optimal health.</p>
  `,
  authorBio: 'Dr. Michael Chen is a preventive care specialist with a focus on early disease detection and wellness programs for pets of all ages.'
},
{
  id: 5,
  title: 'Creating a Pet-Friendly Home',
  author: 'Dr. Sarah Johnson',
  date: 'February 18, 2023',
  excerpt: 'Make your living space safe and comfortable for your pets with these simple home modifications and safety tips.',
  category: 'Pet Care',
  image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80',
  readTime: '5 min read',
  content: `
    <h2>Designing a Safe Space for Your Pets</h2>
    <p>Your home environment significantly impacts your pet's wellbeing. Follow these guidelines to create an ideal living space.</p>
    
    <h3>Pet-Proofing Your Home</h3>
    <ul>
      <li><strong>Electrical safety:</strong> Cover cords or use cord protectors</li>
      <li><strong>Toxic plants:</strong> Remove lilies, poinsettias, sago palms, etc.</li>
      <li><strong>Small objects:</strong> Keep coins, buttons, and small toys out of reach</li>
      <li><strong>Trash cans:</strong> Use pet-proof containers or keep behind closed doors</li>
      <li><strong>Window safety:</strong> Install screens and limit high-rise access for cats</li>
    </ul>
    
    <h3>Essential Pet Zones</h3>
    <p><strong>Resting area:</strong></p>
    <ul>
      <li>Comfortable bed in a quiet corner</li>
      <li>Orthopedic options for older pets</li>
      <li>Multiple options for multi-pet households</li>
    </ul>
    
    <p><strong>Feeding station:</strong></p>
    <ul>
      <li>Non-slip mat under bowls</li>
      <li>Separate areas for food and water</li>
      <li>Elevated stands for large dogs</li>
    </ul>
    
    <p><strong>Play and exercise areas:</strong></p>
    <ul>
      <li>Dedicated space for toys and activities</li>
      <li>Scratching posts for cats</li>
      <li>Indoor potty areas if needed</li>
    </ul>
    
    <h3>Flooring Considerations</h3>
    <ul>
      <li><strong>Best options:</strong> Cork, bamboo, or textured tile</li>
      <li><strong>Avoid:</strong> Slippery hardwood or high-pile carpet</li>
      <li><strong>Rugs:</strong> Use low-pile, washable varieties with non-slip backing</li>
    </ul>
    
    <h3>Temperature and Air Quality</h3>
    <ul>
      <li>Maintain comfortable temperatures (68-78°F generally)</li>
      <li>Provide warm and cool resting options</li>
      <li>Use air purifiers if needed</li>
      <li>Avoid strong fragrances and aerosols</li>
    </ul>
    
    <h3>Outdoor Safety</h3>
    <ul>
      <li>Secure fencing with no gaps</li>
      <li>Pet-safe landscaping (avoid toxic plants/mulch)</li>
      <li>Shaded areas and fresh water access</li>
      <li>Pest control measures (check for pet safety)</li>
    </ul>
    
    <p>A well-designed pet-friendly home reduces stress for both you and your animals while preventing accidents and health issues.</p>
  `,
  authorBio: 'Dr. Sarah Johnson is a veterinarian and animal behaviorist who specializes in creating optimal living environments for companion animals.'
},
{
  id: 6,
  title: 'Nutrition Guide for Senior Dogs',
  author: 'Dr. Sarah Johnson',
  date: 'February 18, 2023',
  excerpt: 'Learn how to adjust your aging dog\'s diet to support their changing nutritional needs and maintain optimal health.',
  category: 'Senior Pets',
  image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e',
  readTime: '5 min read',
  content: `
    <h2>Feeding Your Aging Canine Companion</h2>
    <p>As dogs enter their golden years, their nutritional requirements change significantly. Here's how to adapt their diet for optimal health.</p>
    
    <h3>Key Nutritional Changes for Senior Dogs</h3>
    <ul>
      <li><strong>Reduced calories:</strong> 20-30% less than adult maintenance (adjust for activity)</li>
      <li><strong>Increased protein:</strong> High-quality sources to maintain muscle mass</li>
      <li><strong>Modified fat content:</strong> Reduced for overweight dogs, increased for underweight</li>
      <li><strong>Added fiber:</strong> Supports digestive health and regularity</li>
      <li><strong>Joint supplements:</strong> Glucosamine and chondroitin often beneficial</li>
    </ul>
    
    <h3>Common Senior Dog Health Issues and Dietary Solutions</h3>
    <p><strong>Arthritis:</strong></p>
    <ul>
      <li>Omega-3 fatty acids for inflammation</li>
      <li>Maintain lean body weight</li>
      <li>Consider green-lipped mussel supplements</li>
    </ul>
    
    <p><strong>Kidney disease:</strong></p>
    <ul>
      <li>Reduced phosphorus</li>
      <li>High-quality, moderate protein</li>
      <li>Increased hydration (wet food or water added)</li>
    </ul>
    
    <p><strong>Cognitive decline:</strong></p>
    <ul>
      <li>Antioxidants (vitamins E and C)</li>
      <li>Medium-chain triglycerides (MCTs)</li>
      <li>Phosphatidylserine supplements</li>
    </ul>
    
    <h3>Choosing a Senior Dog Food</h3>
    <p>What to look for:</p>
    <ul>
      <li>AAFCO statement for "all life stages" or "senior"</li>
      <li>Named animal protein as first ingredient</li>
      <li>Appropriate calorie density for your dog's needs</li>
      <li>Added probiotics for gut health</li>
      <li>No artificial preservatives or colors</li>
    </ul>
    
    <h3>Feeding Tips for Senior Dogs</h3>
    <ul>
      <li>Smaller, more frequent meals if appetite is poor</li>
      <li>Slightly warmed food to enhance aroma</li>
      <li>Elevated bowls for large breeds or arthritic dogs</li>
      <li>Regular weight checks to monitor changes</li>
      <li>Plenty of fresh water available</li>
    </ul>
    
    <h3>When to Consult Your Vet</h3>
    <p>Schedule a nutritional consultation if your senior dog:</p>
    <ul>
      <li>Experiences sudden weight loss/gain</li>
      <li>Shows changes in appetite or water consumption</li>
      <li>Develops new food sensitivities</li>
      <li>Has diagnosed health conditions requiring special diets</li>
    </ul>
    
    <p>Proper nutrition can add quality years to your senior dog's life. Work with your veterinarian to develop the best dietary plan for your aging companion.</p>
  `,
  authorBio: 'Dr. Sarah Johnson is a veterinary nutritionist with special certification in geriatric canine dietary needs and weight management.'
}
    // Add content for other posts similarly
  ];

  const post = blogPosts.find(post => post.id === parseInt(id));

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <h2>Post not found</h2>
          <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
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
      <main className="blog-post-main">
        <div className="container">
          <article className="blog-post">
            <div className="post-header">
              <span className="post-category">{post.category}</span>
              <h1 className="post-title">{post.title}</h1>
              <div className="post-meta">
                <span className="post-author">By {post.author}</span>
                <span className="post-date">{post.date}</span>
                <span className="post-read-time">{post.readTime}</span>
              </div>
            </div>

            <div className="post-image">
              <img src={post.image} alt={post.title} />
            </div>

            <div className="post-content">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div className="author-bio">
              <h3>About the Author</h3>
              <p>{post.authorBio}</p>
            </div>

            <div className="post-navigation">
              <Link to="/blog" className="btn btn-secondary">
                <i className="bi bi-arrow-left"></i> Back to Blog
              </Link>
            </div>
          </article>

          {/* Newsletter Subscription */}
          <div className="newsletter-section">
            <div className="newsletter-content">
              <h3>Want More Pet Care Tips?</h3>
              <p>Subscribe to our newsletter for regular updates and expert advice</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </form>
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

export default BlogPost;