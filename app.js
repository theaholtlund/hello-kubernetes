// Import required libraries
const express = require("express");

// Create Express instance, and define port
const app = express();
const PORT = process.env.PORT || 3000;

// Define route handler for default home page
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start app, callback function for when application starts
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
