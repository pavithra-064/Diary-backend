const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users"); 
require('dotenv').config();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register." });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        token,
        message: "Login successful",
        user: user.toObject(), // Convert Mongoose document to plain JavaScript object
      });
    } else {
      return res
        .status(401)
        .json({ message: "Wrong password. Enter password correctly." });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
});

module.exports = router;
