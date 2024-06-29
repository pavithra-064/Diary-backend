const express = require("express");
const router = express.Router();
const Entry = require("../models/memories");

router.get("/:id", async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json(entry);
  } catch (error) {
    console.error("Error fetching entry:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
