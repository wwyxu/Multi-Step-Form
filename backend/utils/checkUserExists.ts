// User Model
import { User } from "../models/user";

const checkUserExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const userCount = await User.find({ email: email })
      .limit(1)
      .countDocuments();

    if (userCount > 0) {
      return res.status(401).json("User already exists!");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }

  next();
};

export default checkUserExists;