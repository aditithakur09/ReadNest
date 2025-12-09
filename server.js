const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

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

// API ROUTES
app.use("/api/auth", authRoutes);   // login signup
app.use("/api/books", bookRoutes);  // sell-book

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));