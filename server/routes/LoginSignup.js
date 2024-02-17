const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");
router.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const HashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: HashedPassword,
      email,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in signup", error);
    res.status(500).json({ message: "Interval server error" });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email);
      console.log(password);
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res.sendStatus(401);
      }
      if (user == null) return res.sendStatus(401);
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.sendStatus(403);
      }
      res.status(200).json({ message: "Login Successful" });
    } catch (error) {
      console.error("Error in login", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

module.exports = router;
