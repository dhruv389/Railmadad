const User = require('../models/User');
// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { auth } = require('../config/firebase');
const bcrypt = require('bcryptjs');



const register = async (req, res) => {
  const { name, email, password, phoneNumber, userType } = req.body;
 console.log(req.body);
  try {
    // Check if user already exists in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user in Firebase
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
      phoneNumber,
    });

    // Hash the password before saving to MongoDB
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);
    // const saltRounds = 10; // Number of salt rounds
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save user data in MongoDB
    const newUser = new User({
      uid: userRecord.uid,
      name,
      email,
      password: hashedPassword, // Save hashed password
      phoneNumber,
      userType,
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', uid: userRecord.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Authenticate with Firebase
    const firebaseUser = await auth.getUser(user.uid);

    res.status(200).json({
      message: 'Login successful',
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      phoneNumber: firebaseUser.phoneNumber,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server Errorp' });
  }
};

// Create New User
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};
const check = async (req, res) => {
    //res.status(201).json({ message: 'User registered successfully', uid: "hhdh" });
    res.send(req.body);
  
};

module.exports = {getUser,createUser,register,login, check}