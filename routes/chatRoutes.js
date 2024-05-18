// chatRoutes.js

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getMessages, sendMessage } = require("../controllers/chatController");

router.get("/messages", auth, getMessages);
router.post("/message", auth, sendMessage);

module.exports = router;
