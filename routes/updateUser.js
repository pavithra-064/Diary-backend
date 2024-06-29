const User = require("../models/users");
const express = require("express");
const router = express.Router();
router.put("/", async (req, res) => {
  try {
    const { email, name } = req.body;
    const userId = req.user.userId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, name },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Failed to update user. Please try again later." });
  }
});
module.exports = router;
