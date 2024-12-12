const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db"); // Ensure this is the correct path for your MongoDB connection file
const taskRoutes = require("./routes/tasks"); // Ensure this is the correct path for your task routes

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.use("/api/tasks", taskRoutes); // Route for task-related APIs

// Root route for a simple check
app.get("/", (req, res) => {
  res.send("AI-Based Personal Assistant Backend is running!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "An internal server error occurred!" });
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
