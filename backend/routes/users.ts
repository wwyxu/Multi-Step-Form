import * as express from 'express';
import bcrypt from "bcrypt";
import validation from "../utils/validation";
import checkUserExists from "../utils/checkUserExists";
import { User } from "../models/user";

const router = express.Router()

router.post("/verifyemail", validation, checkUserExists, async (req, res) => {
  return res.json('ok');
});

router.post("/register", validation, checkUserExists, async (req, res) => {
  const { email, name, password1 } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password1, salt);

    const newUser = User.build({
      name: name,
      email: email,
      password: bcryptPassword,
    });

    await newUser.save();
    return res.json('ok');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
