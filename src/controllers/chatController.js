const Chat = require("../models/Chat");

// Send a message
exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    // Create a new chat message
    const chat = new Chat({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    // Save the chat message
    await chat.save();

    // Return success response
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch chat history between two users
exports.getChatHistory = async (req, res) => {
  const { user1Id, user2Id } = req.params;

  try {
    // Find all messages between the two users
    const chats = await Chat.find({
      $or: [
        { sender: user1Id, receiver: user2Id },
        { sender: user2Id, receiver: user1Id },
      ],
    }).sort({ timestamp: 1 });

    // Return the chat history
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};