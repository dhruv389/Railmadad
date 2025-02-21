const Message = require('../models/Message');

const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join a room based on department, station, and userId
    socket.on('join_room', async ({ department, station, userId }) => {
      const room = `${department}_${station}_${userId}`;
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);

      // Mark all unread messages as viewed when the department opens the chat
      await Message.findOneAndUpdate(
        { department, station, userId },
        { $set: { "messages.$[msg].viewed": true } },
        { arrayFilters: [{ "msg.viewed": false, "msg.sender": "user" }] }
      );

      // Emit an event to update unread message count
      io.to(room).emit('messages_viewed');
    });

    // Handle incoming messages from users
    socket.on('send_message', async ({ department, station, userId, message }) => {
      const room = `${department}_${station}_${userId}`;
      console.log(`Received message from user ${userId} in room ${room}: ${message}`);

      const newMessage = {
        message,
        sender: 'user',
        viewed: false, // Mark as unread for the department
        createdAt: new Date(),
      };

      // Add message to the existing document or create a new one
      const updatedDoc = await Message.findOneAndUpdate(
        { department, station, userId },
        { $push: { messages: newMessage } },
        { new: true, upsert: true }
      );

      // Broadcast the message to the room
      io.to(room).emit('receive_message', newMessage);
    });

    // Handle replies from the department
    socket.on('send_reply', async ({ department, station, userId, message }) => {
      const room = `${department}_${station}_${userId}`;
      console.log(`Reply from department in room ${room}: ${message}`);

      const newReply = {
        message,
        sender: 'department',
        viewed: true, // Mark as viewed for the department since they are sending it
        createdAt: new Date(),
      };

      // Add reply to the existing document
      const updatedDoc = await Message.findOneAndUpdate(
        { department, station, userId },
        { $push: { messages: newReply } },
        { new: true }
      );

      // Broadcast the reply to the room
      io.to(room).emit('receive_message', newReply);
    });

    // Update message status (e.g., resolved)
    socket.on('update_status', async ({ department, station, userId, messageIndex, status }) => {
      const room = `${department}_${station}_${userId}`;

      const updatedDoc = await Message.findOneAndUpdate(
        { department, station, userId },
        { $set: { [`messages.${messageIndex}.status`]: status } },
        { new: true }
      );

      io.to(room).emit('status_updated', updatedDoc.messages[messageIndex]);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};

module.exports = { initializeSocket };
