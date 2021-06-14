const router = require("express").Router();
const bcrypt = require("bcrypt");
const validation = require("../utils/validation");
const checkUserExists = require("../utils/checkUserExists");

const User = require("../models/user");

router.post("/verifyemail", validation, checkUserExists, async (req, res) => {
  return res.json(true);
});

router.post("/register", validation, checkUserExists, async (req, res) => {
  const { email, name, password1 } = req.body;

  try {
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

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.json(users);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
