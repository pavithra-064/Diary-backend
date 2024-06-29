const express = require("express");
const User = require("../models/users");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send(
          "User not found. Are you sure this user exists or did they run away to join the circus?"
        );
    }

    res.json({
      username: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Something went wrong on the server.");
  }
});

module.exports = router;
