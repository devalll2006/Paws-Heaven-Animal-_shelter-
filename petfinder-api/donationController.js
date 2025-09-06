const Donation = require('./Donation');

const submitDonation = async (req, res) => {
  try {
    const { amount, name, email, message } = req.body;
    
    // Validate required fields
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid donation amount is required' 
      });
    }
    
    // Create new donation record
    const newDonation = new Donation({
      amount: parseFloat(amount),
      name: name || 'Anonymous',
      email: email || null,
      message: message || null,
      date: new Date(),
      status: 'completed' // In real app, you'd have payment processing
    });
    
    // Save to database
    await newDonation.save();
    
    // Successful response
    res.status(201).json({ 
      success: true,
      message: 'Donation processed successfully',
      donation: {
        id: newDonation._id,
        amount: newDonation.amount,
        name: newDonation.name,
        date: newDonation.date
      }
    });
    
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error processing donation',
      error: error.message 
    });
  }
};

module.exports = {
  submitDonation
};