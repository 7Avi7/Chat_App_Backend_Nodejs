const chatService = require("../services/chatService");
const Message = require("../models/messageModel");
// Handle sending a message
const sendMessage = async (req, res) => {
  const { receiverId, message } = req.body;

  // Ensure req.files is defined and filter for image files
  let attachments = [];
  if (req.files && req.files.length > 0) {
    attachments = req.files
      .filter((file) => file.mimetype.startsWith("image/"))
      .map((file) => file.path);
  }

  if (!receiverId || !message) {
    return res
      .status(400)
      .json({ error: "Receiver and message are required." });
  }

  try {
    const newMessage = await chatService.sendMessage(
      req.user.id, // Assuming req.user.id is set after authentication
      receiverId,
      message,
      attachments
    );
    res.json(newMessage);
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Error sending message" });
  }
};

// Handle fetching messages between users
const getMessages = async (req, res) => {
  try {
    const { userId1, userId2 } = req.query;

    if (!userId1 || !userId2) {
      return res.status(400).json({
        error: "Both userId1 and userId2 are required query parameters.",
      });
    }

    // Fetch messages where userId1 and userId2 are involved
    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    })
      .populate("sender receiver")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Controller function to fetch a single message by ID
// Handle fetching a single message by ID
const getSingleMessage = async (req, res) => {
  const messageId = req.params.id;

  try {
    const message = await chatService.getSingleMessage(messageId);
    res.json(message);
  } catch (err) {
    console.error("Error fetching message:", err);
    res.status(500).json({ error: "Error fetching message" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getSingleMessage,
};
