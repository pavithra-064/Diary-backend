const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Memory = require("../models/memories");

router.post("/", async (req, res) => {
  const uid = req.user.userId;
  
  if (uid) {
    const user = await User.findOne({ _id: uid });
    if (user) {
      const newMem = new Memory({
        uid: uid,
        date: req.body.date,
        title: req.body.title,
        content: req.body.content,
      });

      await newMem
        .save()
        .then(() => {
          res.status(201).json({ success: true, message: "Data Saved Successfully" });
        })
        .catch((err) => {
          console.error("Error saving data: ", err);
          res.status(500).json({ success: false, message: "Server Error" });
        });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

module.exports = router;
