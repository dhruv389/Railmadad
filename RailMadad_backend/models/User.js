const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password:{type:String,required:true},
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  userType: {
    type: String,
    enum: ['Passenger', 'Staff', 'Admin'],
    default: 'Passenger'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
 // "test": "echo \"Error: no test specified\" && exit 1"