// Import required libraries
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// Create Express instance, and define port
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

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

// Array to store greetings data
let greetings = [];

// Route handler to get all greetings
app.get("/api/greetings", (req, res) => {
  res.json(greetings);
});

// Route handler to add a new greeting
app.post("/api/greetings", (req, res) => {
  const { title, content } = req.body;
  const newGreeting = { id: greetings.length + 1, title, content };
  greetings.push(newGreeting);
  res.status(201).json(newGreeting);
});

// Route handler to update a greeting
app.put("/api/greetings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const greetingToUpdate = greetings.find((greeting) => greeting.id === id);
  if (!greetingToUpdate) {
    return res.status(404).json({ error: "Greeting not found" });
  }
  greetingToUpdate.title = title;
  greetingToUpdate.content = content;
  res.json(greetingToUpdate);
});

// Route handler to delete a greeting
app.delete("/api/greetings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  greetings = greetings.filter((greeting) => greeting.id !== id);
  res.sendStatus(204);
});

// Default route handler
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
