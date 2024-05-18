// authRoutes.js
const express = require("express");
const { signup, login } = require("../controllers/authController");
const upload = require("../config/multer");
const router = express.Router();
const multer = require("../config/multer");

// POST /api/auth/signup
router.post("/signup", upload.single("photo"), signup);

// POST /api/auth/login
router.post("/login", login);

module.exports = router;
