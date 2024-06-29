const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Access Denied");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = authenticateToken;
