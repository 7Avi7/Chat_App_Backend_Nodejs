const authService = require("../services/authService");

exports.signup = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ msg: "No file uploaded or file type is not supported." });
  }

  const { name, email, password } = req.body;
  const photo = req.file.path;

  try {
    const token = await authService.signup(name, email, password, photo);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
  console.log(email);
};
