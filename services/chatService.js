const Message = require("../models/messageModel");

// Service function to send a message
const sendMessage = async (senderId, receiverId, message, attachments) => {
  try {
    // Ensure required fields are present
    if (!senderId || !receiverId || !message) {
      throw new Error("Sender, receiver, and message are required.");
    }

    // Create a new message document
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message: message,
      attachments: attachments,
    });

    // Save the message to the database
    await newMessage.save();

    return newMessage;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; // Propagate the error to the caller
  }
};

// Service function to get messages between users
const getMessages = async (userId1, userId2) => {
  try {
    // Fetch messages where userId1 and userId2 are involved
    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    })
      .populate("sender receiver")
      .sort({ createdAt: 1 });

    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error; // Propagate the error to the caller
  }
};

// Service function to fetch a single message by ID
const getSingleMessage = async (messageId) => {
  try {
    const message = await Message.findById(messageId).populate(
      "sender receiver"
    );

    if (!message) {
      throw new Error("Message not found");
    }

    return message;
  } catch (error) {
    console.error("Error fetching message:", error);
    throw error; // Propagate the error to the caller
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getSingleMessage,
};
