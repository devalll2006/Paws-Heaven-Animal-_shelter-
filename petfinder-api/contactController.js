const express = require('express');
const mongoose = require('mongoose');

// Create the router
const router = express.Router();

// Define the Contact Schema and Model
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);

// Contact Form Submission Route
router.post('/submit', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Check if email already exists
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(400).json({ 
        success: false,
        message: 'This email has already been used to send a message. Please use a different email address.'
      });
    }

    // Create new contact
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    await newContact.save();
    
    res.status(201).json({ 
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });
  } catch (error) {
    if (error.code === 11000) { // MongoDB duplicate key error
      res.status(400).json({
        success: false,
        message: 'This email has already been used to send a message. Please use a different email address.'
      });
    } else {
      console.error('Error submitting contact form:', error);
      res.status(500).json({ 
        success: false,
        message: 'An error occurred while submitting your message. Please try again later.'
      });
    }
  }
});

// Export the router
module.exports = router;