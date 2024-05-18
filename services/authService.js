const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (name, email, password, photo) => {
  let user = await User.findOne({ email });
  if (user) throw new Error("User already exists");

  const isFirstUser = (await User.countDocuments()) === 0;
  // Extract filename from photo path
  const filename = photo.split("\\").pop(); // Extracts filename from path (handling Windows path separator)

  user = new User({
    name,
    email,
    password,
    role: isFirstUser ? "admin" : "general",
    photo: filename,
  });
  await user.save();

  const payload = { user: { id: user.id, role: user.role } };
  const token = jwt.sign(payload, "secretToken", { expiresIn: "7h" });

  return token;
};

const login = async (email, password) => {
  let user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const payload = { user: { id: user.id, role: user.role } };
  const token = jwt.sign(payload, "secretToken", { expiresIn: "1h" });

  return token;
};

module.exports = {
  signup,
  login,
};
