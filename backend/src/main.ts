import express = require("express");
import cors = require("cors");
import 'dotenv/config';
import mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION_STRING as string || "", {})
  .then(() => {
    console.log("Connected to MongoDB");})
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
