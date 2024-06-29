const express = require("express");
const router = express.Router();
const Entry = require("../models/memories");

router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const entries = await Entry.find({ uid: userId }); 
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch entries. Please try again later." });
  }
});

module.exports = router;
