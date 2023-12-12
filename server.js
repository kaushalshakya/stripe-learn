const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const Users = require("./models/user.model");

app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then((conn) => {
  console.log("Database >>> Connection established successfully");
});

app.get("/", async (req, res) => {
  const users = await Users.find();
  return res.json({ message: "STRIPE", users });
});

app.listen(PORT, () => {
  console.log(`Server >>> http://localhost:${PORT}`);
});
