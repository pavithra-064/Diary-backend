const express = require("express");
const router = express.Router();
const Entry = require("../models/memories");

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, date, content } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { title, date, content },
      { new: true }
    );
    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: "Error updating entry" });
  }
});

module.exports = router;
