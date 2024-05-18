const chatService = require("../services/chatService");

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
    const userId2 = req.user.id; // Assuming userId2 is obtained from authenticated user

    // Fetch messages where userId2 is the receiver
    const messages = await Message.find({ receiver: userId2 })
      .populate("sender receiver")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
