const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  name: {
    type: String,
    default: 'Anonymous'
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return !v || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  message: {
    type: String,
    maxlength: 500
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentId: String // For payment processor reference
}, {
  timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);