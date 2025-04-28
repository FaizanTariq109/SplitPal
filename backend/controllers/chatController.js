const Message = require("../models/Chat"); // Make sure this is Chat.js, not Message.js
//const { sendMessageToSocket } = require('../utils/socketUtils'); // Optional real-time socket integration

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { groupId, userId, message } = req.body;
    const newMessage = new Message({ groupId, userId, message });

    await newMessage.save();

    // If you're not using sockets yet, you can comment this out
    // sendMessageToSocket(groupId, newMessage);

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get messages in a group
exports.getMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const messages = await Message.find({ groupId });
    res.json({ messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
