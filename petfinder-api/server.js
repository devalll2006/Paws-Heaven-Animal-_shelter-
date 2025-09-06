require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-adoption';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const vetController = require('./vetContraller');
const contactRoutes = require('./contactController');
const authRoutes = require('./userAuth.js');
const donationRoutes = require('./donationRoutes');

app.get('/api/vets', vetController.getAllVets);
app.post('/api/vets/appointments', vetController.bookAppointment);
app.get('/api/vets/appointments', vetController.getAllAppointments);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);

// MongoDB Schemas
const adoptionApplicationSchema = new mongoose.Schema({
  petId: { type: Number, required: true },
  petName: { type: String, required: true },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  phone: String,
  address: String,
  homeType: String,
  experience: String,
  otherPets: String,
  message: String,
  status: { type: String, default: 'pending' },
  date: { type: Date, default: Date.now }
});

const newsletterSubscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribed: { type: Boolean, default: true },
  subscribedAt: { type: Date, default: Date.now }
});



const lostFoundPetSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['lost', 'found'] },
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  breed: { type: String, required: true },
  color: { type: String, required: true },
  lastSeen: { type: String, required: true },
  date: { type: Date, required: true },
  contact: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  resolved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const AdoptionApplication = mongoose.model('AdoptionApplication', adoptionApplicationSchema);
const LostFoundPet = mongoose.model('LostFoundPet', lostFoundPetSchema);
const NewsletterSubscription = mongoose.model('NewsletterSubscription', newsletterSubscriptionSchema);


// Sample database (in production, use a real database)
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
    description: 'Friendly and energetic lab who loves playing fetch.',
    image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80'
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
    description: 'Luna is a gentle and affectionate cat...',
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13'
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
       image: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
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
       image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
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
        image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530',
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
      image: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19',
     },
  {
    id: 7,
    name: 'Lucy',
    type: 'Cat',
    breed: 'Persian',
    age: '3 years',
    gender: 'Female',
    size: 'Medium',
    color: 'White',
    location: 'Seattle',
    description: 'Calm and elegant cat who enjoys a quiet environment.',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce'
  },
  {
    id: 8,
    name: 'Max',
    type: 'Dog',
    breed: 'German Shepherd',
    age: '4 years',
    gender: 'Male',
    size: 'Large',
    color: 'Black and tan',
    location: 'Austin',
    description: 'Intelligent and protective, great for active families.',
    image: 'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb'
  }
];

// API Routes

// Get all pets
app.get('/api/pets', (req, res) => {
  try {
    res.status(200).json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

// Get single pet
app.get('/api/pets/:id', (req, res) => {
  try {
    const pet = pets.find(p => p.id === parseInt(req.params.id));
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    console.error('Error fetching pet:', error);
    res.status(500).json({ error: 'Failed to fetch pet' });
  }
});

// Submit adoption application
app.post('/api/adopt', async (req, res) => {
  try {
    const { petId, name, email, phone, address, homeType, experience, otherPets, message } = req.body;

    // Validation
    if (!petId || !name || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields: petId, name, and email are required',
        received: req.body
      });
    }

    // Check if pet exists
    const pet = pets.find(p => p.id === parseInt(petId));
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }



    // Create application
    const application = new AdoptionApplication({
      petId,
      petName: pet.name,
      applicantName: name,
      applicantEmail: email,
      phone: phone || '',
      address: address || '',
      homeType: homeType || '',
      experience: experience || '',
      otherPets: otherPets || '',
      message: message || ''
    });

    // Save application to MongoDB
    const savedApplication = await application.save();
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application: savedApplication
    });

  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Get all adoption applications (for admin purposes)
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await AdoptionApplication.find().sort({ date: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get all donations (for admin purposes)
app.get('/api/donations', async (req, res) => {
  try {
    // Return sample data for now - in production, fetch from donations collection
    const sampleDonations = [
      {
        donorName: 'John Smith',
        email: 'john@example.com',
        amount: 50,
        type: 'One-time',
        date: new Date('2024-01-15')
      },
      {
        donorName: 'Sarah Johnson',
        email: 'sarah@example.com',
        amount: 25,
        type: 'Monthly',
        date: new Date('2024-01-10')
      }
    ];
    res.status(200).json(sampleDonations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// Get all contact messages (for admin purposes)
app.get('/api/messages', async (req, res) => {
  try {
    // Return sample data for now - in production, fetch from messages collection
    const sampleMessages = [
      {
        name: 'Alice Brown',
        email: 'alice@example.com',
        subject: 'Volunteer Inquiry',
        message: 'I would like to volunteer at your shelter. Please let me know how I can help.',
        date: new Date('2024-01-12')
      },
      {
        name: 'Mike Wilson',
        email: 'mike@example.com',
        subject: 'Pet Care Question',
        message: 'I have questions about caring for a rescued cat. Can someone help me?',
        date: new Date('2024-01-08')
      }
    ];
    res.status(200).json(sampleMessages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Lost & Found Pets API Routes

// Submit lost/found pet report
app.post('/api/lost-found', async (req, res) => {
  try {
    const { 
      type, 
      petName, 
      petType, 
      breed, 
      color, 
      lastSeen, 
      date, 
      contact, 
      description, 
      imageUrl, 
      location 
    } = req.body;

    // Basic validation
    if (!type || !petName || !petType || !breed || !color || !lastSeen || !date || !contact || !description || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!location.lat || !location.lng) {
      return res.status(400).json({ error: 'Location coordinates are required' });
    }

    const newReport = new LostFoundPet({
      type,
      petName,
      petType,
      breed,
      color,
      lastSeen,
      date: new Date(date),
      contact,
      description,
      imageUrl: imageUrl || '',
      location: {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng)
      }
    });

    const savedReport = await newReport.save();
    
    res.status(201).json({
      success: true,
      message: 'Report submitted successfully',
      report: savedReport
    });

  } catch (error) {
    console.error('Error submitting lost/found report:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Get all lost/found pet reports
app.get('/api/lost-found', async (req, res) => {
  try {
    const { type, resolved } = req.query;
    let query = {};
    
    if (type) {
      query.type = type;
    }
    
    if (resolved !== undefined) {
      query.resolved = resolved === 'true';
    }

    const reports = await LostFoundPet.find(query).sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching lost/found reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// Mark report as resolved
app.put('/api/lost-found/:id/resolve', async (req, res) => {
  try {
    const report = await LostFoundPet.findByIdAndUpdate(
      req.params.id,
      { resolved: true },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Report marked as resolved',
      report
    });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ error: 'Failed to update report' });
  }
});

// Newsletter subscription endpoint
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false,
        message: 'Email is required' 
      });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // For now, just return success without database operations
    // In production, you would save to database
    res.status(200).json({
      success: true,
      message: 'Successfully subscribed! You will receive our latest blog updates.'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to subscribe. Please try again later.' 
    });
  }
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Something went wrong on our end' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Endpoints:`);
  console.log(`- GET    http://localhost:${PORT}/api/pets`);
  console.log(`- GET    http://localhost:${PORT}/api/pets/:id`);
  console.log(`- POST   http://localhost:${PORT}/api/adopt`);
  console.log(`- GET    http://localhost:${PORT}/api/applications`);
  console.log(`- POST   http://localhost:${PORT}/api/lost-found`);
  console.log(`- GET    http://localhost:${PORT}/api/lost-found`);
  console.log(`- PUT    http://localhost:${PORT}/api/lost-found/:id/resolve`);

});