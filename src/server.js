const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
connectDB();
cors();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to NexaApply Server!",
    status: 200,

  })
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
