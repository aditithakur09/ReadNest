const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Database connection
require("./config/db");

// ROUTES
const authRoutes = require("./routes/loginRoutes");      // login/signup routes
const bookRoutes = require("./routes/sellRoutes");  // selling books routes

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads"));   // for images

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// API ROUTES
app.use("/api/auth", authRoutes);   // login signup
app.use("/api/books", bookRoutes);  // sell-book

// START SERVER
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));