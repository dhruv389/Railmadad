const express = require('express');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/errorHandler');
const route1 = require('./routes/UserRoutes');
const route2 = require('./routes/complaintRoutes');
const route3 = require('./routes/manageCompaintRoutes');
const messageRoutes = require('./routes/messageRoutes');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { initializeSocket } = require('./routes/socketUtils');

// Load environment variables
require('dotenv').config();

// Initialize Express App
const app = express();

// Connect to the Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api', route1); // User routes
app.use('/api', route2); // Complaint routes
app.use('/api', route3); // Manage complaint routes
app.use('/api', messageRoutes); // Message routes

// Error Handling Middleware
app.use(errorHandler);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Allow your frontend to connect
    methods: ['GET', 'POST'],
  },
});

// Initialize Socket.IO logic
initializeSocket(io);

// Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;