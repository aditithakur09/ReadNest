// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// require("dotenv").config();

// // Database connection
// require("./config/db");

// // ROUTES
// const authRoutes = require("./routes/loginRoutes");      // login/signup routes
// const bookRoutes = require("./routes/sellRoutes");  // selling books routes

// const app = express();

// // MIDDLEWARES
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));   // for images

// app.get("/", (req, res) => {
//   res.send("Backend is working!");
// });

// // API ROUTES
// app.use("/api/auth", authRoutes);   // login signup
// app.use("/api/books", bookRoutes);  // sell-book

// // START SERVER
// const PORT = process.env.PORT;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // local ke liye (Railway me ignore hota hai)

// DB connection
require("./config/db");

// Routes
const authRoutes = require("./routes/loginRoutes");
const bookRoutes = require("./routes/sellRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Health check / root route (Railway ke liye useful)
app.get("/", (req, res) => {
  res.status(200).send("✅ ReadNest Backend is running on Railway");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// 🚀 START SERVER (IMPORTANT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});