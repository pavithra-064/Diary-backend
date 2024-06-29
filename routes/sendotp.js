const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../models/users"); 
require('dotenv').config();

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({
          message: "No user found with the given email. Please register.",
        });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const token = jwt.sign({ email, otp }, "diary", {
      expiresIn: "10m",
    });

    user.otp = otp;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass:process.env.USER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. It will expire in 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res
          .status(500)
          .json({ message: "Mail not sent. Try again after sometime." });
      }
      res.status(200).json({ message: "Mail sent successfully" });
    });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
