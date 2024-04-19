// Import required libraries
const express = require("express");

// Create Express instance, and define port
const app = express();
const PORT = process.env.PORT || 3000;

// Define route handler for default home page
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define route handler to get current date and time
app.get("/datetime", (req, res) => {
  const currentDate = new Date().toLocaleString();
  res.send(`Current date and time: ${currentDate}`);
});

// Start app, callback function for when application starts
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
