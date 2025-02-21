// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Get messages for a specific department, station, and user
router.get('/getchatmessage', messageController.getMessages);
router.get('/getchatusers', messageController.getUsersByStationAndDepartment);

// Create a new message
router.post('/getchatmessage', messageController.createMessage);

// Update message status
router.put('/:messageId', messageController.updateMessageStatus);

module.exports = router;