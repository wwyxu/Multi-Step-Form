const router = require("express").Router();
const bcrypt = require("bcrypt");
const validation = require("../middleware/validation");
const checkUserExists = require("../middleware/checkUserExists");

// User Model
const User = require("../models/userModel");

// Check if Email exists in Database
router.post("/verifyemail", validation, checkUserExists, async (req, res) => {
  return res.json(true);
});

// Register User
router.post("/register", validation, checkUserExists, async (req, res) => {
  const { email, name, password1 } = req.body;

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password1, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: bcryptPassword,
    });

    await newUser.save();
    return res.json(true);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get all Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.json(users);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
