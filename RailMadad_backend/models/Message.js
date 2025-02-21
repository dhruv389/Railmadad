const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  department: { type: String, required: true },
  station: { type: String, required: true },
  messages: [
    {
      message: { type: String, required: true },
      sender: { type: String, enum: ['user', 'department'], required: true },
      status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
      viewed: { type: Boolean, default: false }, // ✅ New field to track unread messages
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Message', messageSchema);
