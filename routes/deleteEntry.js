const express = require("express");
const router = express.Router();
const Entry = require("../models/memories");

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEntry = await Entry.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
