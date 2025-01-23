const express = require('express');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/errorHandler');
const route1 = require("./routes/UserRoutes");
const route2 = require("./routes/complaintRoutes");
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express App
const app = express();
app.use(cors());
// Connect to the Database

require("dotenv").config();
// Middleware

app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.use(morgan('dev'));

// Routes
app.use('/api', route1);

app.use('/api', route2);

// Error Handling Middleware
app.use(errorHandler);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
connectDB();
