const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getMessages,
  sendMessage,
  getSingleMessage,
} = require("../controllers/chatController");
const upload = require("../config/multer"); // assuming multer configuration is in this file

router.get("/messages", auth, getMessages);
router.post("/message", auth, upload.array("attachments"), sendMessage);

router.get("/message/:id", auth, getSingleMessage);

module.exports = router;
