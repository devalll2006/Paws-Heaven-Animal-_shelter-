const mongoose = require('mongoose');

// Define the Vet Appointment Schema
const vetAppointmentSchema = new mongoose.Schema({
  vetId: { type: Number, required: true },
  vetName: { type: String, required: true },
  clinic: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true },
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  ownerPhone: { type: String, required: true },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

const VetAppointment = mongoose.model('VetAppointment', vetAppointmentSchema);

// Sample vets data - ensure IDs are numbers (not strings)
const sampleVets = [
  {
    id: 1, // Must be number (not "1")
    name: 'Dr. Sarah Johnson',
    specialty: 'General Practice',
    clinic: 'Paws & Claws Animal Hospital',
    phone: '(555) 123-4567',
    email: 's.johnson@pawsclaws.com'
  },
  {
    id: 2, // Must be number (not "2")
    name: 'Dr. Michael Chen',
    specialty: 'Surgery',
    clinic: 'Animal Wellness Center',
    phone: '(555) 234-5678',
    email: 'm.chen@wellnessvet.com'
  },
  {
      id: 3, //Must be number (not "3")
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      clinic: 'Healthy Pets Veterinary Clinic',
      address: '789 Animal Care Rd, Los Angeles, CA',
      phone: '(555) 345-6789',
      email: 'e.rodriguez@healthypets.com',
  },
   {
      id: 4, //Must be number (not "4")
      name: 'Dr. James Wilson',
      specialty: 'Emergency Care',
      clinic: '24/7 Animal Emergency',
      address: '101 Critical Care Blvd, Austin, TX',
      phone: '(555) 456-7890',
      email: 'j.wilson@animalemergency.com',
   },
];

// Controller functions
module.exports = {
  // Get all vets
  getAllVets: (req, res) => {
    res.json(sampleVets);
  },

  // Book appointment
  bookAppointment: async (req, res) => {
    try {
      // 1. Validate required fields
      const requiredFields = ['vetId', 'date', 'time', 'petName', 'petType', 'ownerName', 'ownerEmail', 'ownerPhone'];
      const missingFields = requiredFields.filter(field => !req.body[field]);
      
      if (missingFields.length > 0) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          missingFields 
        });
      }

      // 2. Convert vetId to number
      const vetId = Number(req.body.vetId);
      if (isNaN(vetId)) {
        return res.status(400).json({ 
          error: 'vetId must be a number',
          received: req.body.vetId
        });
      }

      // 3. Find the vet (using == for loose comparison)
      const vet = sampleVets.find(v => v.id == req.body.vetId);
      
      if (!vet) {
        return res.status(404).json({ 
          error: 'Vet not found',
          availableVetIds: sampleVets.map(v => v.id)
        });
      }

      // 4. Create and save appointment
      const appointment = new VetAppointment({
        vetId: vetId,
        vetName: vet.name,
        clinic: vet.clinic,
        date: new Date(req.body.date),
        time: req.body.time,
        reason: req.body.reason || 'General checkup',
        petName: req.body.petName,
        petType: req.body.petType,
        ownerName: req.body.ownerName,
        ownerEmail: req.body.ownerEmail,
        ownerPhone: req.body.ownerPhone
      });

      await appointment.save();
      
      // 5. Send success response
      res.status(201).json({ 
        success: true,
        message: `Appointment booked with ${vet.name}`,
        appointmentId: appointment._id
      });

    } catch (error) {
      console.error('Booking error:', error);
      res.status(500).json({ 
        error: 'Failed to book appointment',
        details: error.message
      });
    }
  },

  // Get all appointments
  getAllAppointments: async (req, res) => {
    try {
      const appointments = await VetAppointment.find().sort({ createdAt: -1 });
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  }
};