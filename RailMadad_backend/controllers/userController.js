const User = require('../models/User');
// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { auth } = require('../config/firebase');
const bcrypt = require('bcryptjs');

const AccountModel = require('../models/AccountModel');




const Adminlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in MongoDB
    const user = await AccountModel.findOne({ email , userType: 'Admin'});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Authenticate with Firebase
   
    res.status(200).json({
      message: 'Admin Login successful',
      data: {
        email: user.email,
        userType: user.userType,
        station: user.station,
      },
    
    });
  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const Stafflogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in MongoDB
    const user = await AccountModel.findOne({ email , userType: 'Staff'});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Authenticate with Firebase
   
    res.status(200).json({
      message: 'Staff Login successful',
      data: {
        email: user.email,
        userType: user.userType,
        station: user.station,
      },
    
    });
  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};











module.exports = {Adminlogin,Stafflogin};