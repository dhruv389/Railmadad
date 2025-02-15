const User = require("../models/User");
// src/routes/authRoutes.js
const Otp = require("../models/OtpModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");


const Account = require("../models/AccountModel");


const Adminlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in MongoDB
    const user = await Account.findOne({ email, userType: "Admin" });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Admin Login successful",
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
    const user = await Account.findOne({ email, userType: "Staff" });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Authenticate with Firebase

    res.status(200).json({
      message: "Staff Login successful",
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

const transporter = nodemailer.createTransport({
  service: "Gmail", // Change to your SMTP service (e.g., Yahoo, Outlook)
  auth: {
    user: "drcoder389@gmail.com", // Sender's email address
    pass: "vmam tqmr pkei ekqb", // Sender's email password or App Password
  },
});

const SendOtp = async (req, res) => {
  const recipientEmail = "rathoddhaval389@gmail.com";

  // Generate a 6-digit OTP
  const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpirationTime = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

  try {
    // Save the OTP to the database
    const newOtp = new Otp({
      email: recipientEmail,
      otp: generatedOTP,
      expiresAt: new Date(otpExpirationTime),
    });
    await newOtp.save();

    // Send the OTP via email
    const mailOptions = {
      from: "drcoder389@gmail.com", // Sender's email
      to: recipientEmail, // Recipient's email
      subject: "Your OTP Code",
      text: `Your OTP is: ${generatedOTP}. It is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to send OTP.", error: error.message });
  }
};

const ValidateOtp = async (req, res) => {
  const { otp } = req.body; // Email and OTP entered by the user

  if (!otp) {
    return res.status(400).json({ message: "Email and OTP are required." });
  }
  const email = "rathoddhaval389@gmail.com";
  try {
    // Find the OTP in the database
    const foundOtp = await Otp.findOne({ email, otp });

    if (!foundOtp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    // Check if the OTP is expired
    if (new Date() > foundOtp.expiresAt) {
      await Otp.deleteOne({ _id: foundOtp._id }); // Remove expired OTP
      return res.status(400).json({ message: "OTP has expired." });
    }

    // OTP is valid

    const SECRET_KEY = process.env.SECRET_KEY || "EYDVHB8y849guyihsgh79GJRT"; // Use environment variable
    const expiresIn = "1h"; // Token expiration time (e.g., 1 hour)

    // Create the payload for the token
    const payload = {
      id: foundOtp._id, // Use user ID
      email: foundOtp.email, // Include user email
    };

    // Sign the token with the payload, secret key, and expiration
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn });
    await Otp.deleteOne({ _id: foundOtp._id }); // Remove OTP after successful validation
    return res
      .status(200)
      .json({ message: "OTP validated successfully.", token });
  } catch (error) {
    console.error("Error validating OTP:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to validate OTP.", error: error.message });
  }
};

const getAccount = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json({
      message: "Accounts fetched successfully",
      data: accounts,
    });
  } catch (error) {
    console.error("Error fetching accounts:", error.message);
    res.status(500).json({
      message: "Failed to fetch accounts",
      error: error.message,
    });
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAccount = await Account.findByIdAndDelete(id);

    if (!deletedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({
      message: "Account deleted successfully",
      data: deletedAccount,
    });
  } catch (error) {
    console.error("Error deleting account:", error.message);
    res.status(500).json({
      message: "Failed to delete account",
      error: error.message,
    });
  }
};

const updateAccount = async (req, res) => {
  const { id } = req.params;
  const {updateData} = req.body;
 
   console.log(updateData.updatedData)
   console.log(id)
  if (!updateData.updatedData) {
      return res.status(400).json({ message: "No update data provided" });
    }

  try {

    const { email, userType, station } = updateData.updatedData;
   console.log(email,userType,station)
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { $set: { email, userType, station } },
      { new: true, runValidators: true }
    );
    
    console.log(updatedAccount);
    if (!updatedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({
      message: "Account updated successfully",
      data: updatedAccount,
    });
  } catch (error) {
    console.error("Error updating account:", error.message);
    res.status(500).json({
      message: "Failed to update account",
      error: error.message,
    });
  }
};

const CreateAccount = async (req, res) => {
  const { email, password, userType, station } = req.body;

  if (!email || !password || !userType || !station) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // ✅ Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAccount = new Account({ 
      email, 
      password: hashedPassword, // ✅ Save hashed password
      userType, 
      station
    });

    await newAccount.save();

    res.status(201).json({
      message: "Account created successfully",
      data: newAccount,
    });
  } catch (error) {
    console.error("Error creating account:", error.message);
    res.status(500).json({
      message: "Failed to create account",
      error: error.message,
    });
  }
};

module.exports = {
  Adminlogin,
  Stafflogin,
  SendOtp,
  ValidateOtp,
  getAccount,
  deleteAccount,
  updateAccount,
  CreateAccount,
};
