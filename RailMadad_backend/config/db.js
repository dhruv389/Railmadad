const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://drcoder389:V1SidMeEfRU6PyiK@sih24-db.9i7yz.mongodb.net/?retryWrites=true&w=majority&appName=sih24-db").then(()=>  console.log('MongoDB connected successfully')).catch(e=>console.log(e));
   
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
