const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: [
      'Engineering Department',
      'Electrical Department',
      'Traffic Department',
      'Medical Department',
      'Security Department',
      'Sanitation Department',
      'Food Department',
    ],
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved', 'Closed'],
    default: 'Pending'
  },
  media: [
    {
      type: String, // URL of the media
      required: false
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  typeOfComplaint: {
    type: String,
    enum: ['Station', 'Train'],
    required: true
  },
  stationName: {
    type: String,
    // required: true
  },
 
  pnrNumber: {
    type: Number,
    // required: true
  },
  staffmedia: [
    {
      type: String, // URL of the media
      required: false
    }
  ],

});

module.exports = mongoose.model('Complaint', complaintSchema);
