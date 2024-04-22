// Import required libraries
const express = require("express");
const path = require("path");

// Create Express instance, and define port
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Define route handler for default home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Define route handler for datetime page
app.get("/datetime", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "datetime.html"));
});

// Define route handler to get current date and time
app.get("/currentdatetime", (req, res) => {
  const currentDate = new Date().toLocaleString();
  res.json({ datetime: currentDate });
});

// Start app, callback function for when application starts
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
