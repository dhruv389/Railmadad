const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
 
  password:{type:String,required:true},
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
 
  userType: {
    type: String,
    enum: ['Staff', 'Admin'],
   required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  station:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Account', userSchema);
 // "test": "echo \"Error: no test specified\" && exit 1"