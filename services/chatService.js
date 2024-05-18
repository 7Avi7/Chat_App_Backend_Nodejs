const Message = require("../models/messageModel");

// Service function to send a message
const sendMessage = async (senderId, receiverId, message, attachments) => {
  const newMessage = new Message({
    sender: senderId,
    receiver: receiverId,
    message: message,
    attachments: attachments,
  });
  await newMessage.save();
  return newMessage;
};

// Service function to get messages between users
const getMessages = async (userId1, userId2) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    }).sort({ createdAt: 1 });
    return messages;
  } catch (err) {
    console.error("Error fetching messages:", err);
    throw new Error("Error fetching messages");
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
