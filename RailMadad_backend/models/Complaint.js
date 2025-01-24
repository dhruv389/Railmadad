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
    enum: ['Pending', 'In Progress', 'Resolved'],
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
    required: true
  },
 
  pnrNumber: {
    type: Number,
    // required: true
  },
  AfterImage:{
    type:String,
    default:"https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
  }
  ,
ReceiverType:{
    type:String,
    default:"Admin"

}
});

module.exports = mongoose.model('Complaint', complaintSchema);
