const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashedPass,
    });

    await user.save();
    
    res.status(201).json({ success: true, message: "User Created Successfully" });
  } catch (err) {
    if (err && err.code === 11000) {
      res.json({
        success: false,
        message: "User Already exists! Try with another email.",
      });
    } else {
      console.log("Error in register:", err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
});

module.exports = router;
