const Message = require('../models/Message');

// ✅ Get all messages for a specific department, station, and user (Already in order)
const getMessages = async (req, res) => {
  const { department, station, userId } = req.query;
  try {
    const messagesDoc = await Message.findOne({ department, station, userId });
    res.json(messagesDoc ? messagesDoc.messages : []); // Return messages array if exists
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// ✅ Add a new message to the existing conversation (Push to messages array)
const createMessage = async (req, res) => {
  const { department, station, userId, message, sender } = req.body;
  try {
    const newMessage = { message, sender, createdAt: new Date(), viewed: sender === 'department' }; 

    const updatedDoc = await Message.findOneAndUpdate(
      { department, station, userId },
      { $push: { messages: newMessage } },
      { new: true, upsert: true }
    );

    res.status(201).json(updatedDoc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create message' });
  }
};


const getUsersByStationAndDepartment = async (req, res) => {
  const { department, station } = req.query;
  console.log(department, station);

  try {
    const users = await Message.aggregate([
      // Step 1: Match documents by department and station
      { $match: { department, station } },

      // Step 2: Unwind the messages array
      { $unwind: "$messages" },

      // Step 3: Sort messages by createdAt in descending order (latest first)
      { $sort: { "messages.createdAt": -1 } },

      // Step 4: Group by userId and calculate required fields
      {
        $group: {
          _id: "$userId", // Group by userId
          latestMessage: { $first: "$messages.message" }, // Get the latest message
          latestTime: { $first: "$messages.createdAt" }, // Get the latest message time
          unshownCount: {
            $sum: {
              $cond: [{ $eq: ["$messages.viewed", false] }, 1, 0], // Count unshown messages
            },
          },
        },
      },

      // Step 5: Sort users by latest message time
      { $sort: { latestTime: -1 } },

      // Step 6: Project the required fields
      {
        $project: {
          _id: 0, // Exclude the default _id field
          userId: "$_id", // Rename _id to userId
          latestMessage: 1, // Include latestMessage
          unshownCount: 1, // Include unshownCount
        },
      },
    ]);

    res.json(users);
    console.log(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};



const getUnreadMessagesCount = async (req, res) => {
  const { department, station, userId } = req.query;

  try {
    const messagesDoc = await Message.findOne({ department, station, userId });

    if (!messagesDoc) return res.json({ unreadCount: 0 });

    // Count messages that are `viewed: false`
    const unreadCount = messagesDoc.messages.filter(msg => !msg.viewed && msg.sender === 'user').length;

    res.json({ unreadCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch unread messages count' });
  }
};



const markMessagesAsViewed = async (req, res) => {
  const { department, station, userId } = req.body;

  try {
    const updatedDoc = await Message.findOneAndUpdate(
      { department, station, userId },
      { $set: { "messages.$[msg].viewed": true } }, // ✅ Mark all as viewed
      { arrayFilters: [{ "msg.viewed": false, "msg.sender": "user" }], new: true }
    );

    res.json({ message: "Messages marked as viewed", updatedDoc });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark messages as viewed' });
  }
};





// ✅ Update message status inside messages array
const updateMessageStatus = async (req, res) => {
  const { department, station, userId, messageId } = req.params;
  const { status } = req.body;

  try {
    const updatedDoc = await Message.findOneAndUpdate(
      { department, station, userId, "messages._id": messageId }, // Find message inside array
      { $set: { "messages.$.status": status } }, // Update only the matched message
      { new: true }
    );

    res.json(updatedDoc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update message status' });
  }
};

module.exports = {
  getMessages,
  createMessage,
  updateMessageStatus,
  getUsersByStationAndDepartment,
  getUnreadMessagesCount,
  markMessagesAsViewed

};
