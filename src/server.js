const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to NexaApply Server!",
    status: 200,
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/colleges", require("./routes/collegeRoutes"));
app.use("/api/admissions", require("./routes/admissionRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));

app.use((req, res, next) => {
  const error = new Error("Resource Not Found");
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  console.log(error);
  if (error.status) {
    return res.status(error.status).send(`<p>${error.message}</p>`);
  }
  res.status(500).send("<h2>Something went wrong</h2>");
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
