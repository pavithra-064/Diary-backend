const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require('dotenv').config();
const registerRouter = require("./routes/register");
const authenticateToken = require("./middleware/auth");
const loginRouter = require("./controller/authController");
const newEntryRouter = require("./routes/newEntry");
const allEntriesRouter = require("./routes/allEntries");
const viewEntryRouter = require("./routes/entryById");
const editEntryRouter = require("./routes/editEntry");
const userRouter = require("./routes/userDetails");
const setPasswordRouter = require("./routes/setPassword");
const otpRouter = require("./routes/sendotp");
const profileRouter = require("./routes//updateUser");
const deleteEntryRouter=require("./routes/deleteEntry")


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const mongoURI =
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.1xyntw2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening at ${PORT}`); 
    });
  })
  .catch((err) => console.log("Error Raised: ", err));
  
app.get("/",(req,res)=>{
  return "Server is running"
})

app.use("/api/login", loginRouter);
app.use("/api/user", authenticateToken, userRouter);
app.use("/api/register", registerRouter);
app.use("/api/newentry", authenticateToken, newEntryRouter);
app.use("/api/allentries", authenticateToken, allEntriesRouter);
app.use("/api/viewentry", authenticateToken, viewEntryRouter);
app.use("/api/editentry", authenticateToken, editEntryRouter);
app.use("/api/setpassword", setPasswordRouter);
app.use("/api/sendotp", otpRouter);
app.use("/api/profile/update", authenticateToken, profileRouter);
app.use("/api/deleteentry",authenticateToken,deleteEntryRouter)

