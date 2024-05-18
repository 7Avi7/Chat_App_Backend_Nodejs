// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");

router.get("/search", auth, async (req, res) => {
  const { name } = req.query;
  try {
    const users = await User.find({ name: new RegExp(name, "i") }).select(
      "name photo"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Failed to search users" });
  }
});

module.exports = router;
