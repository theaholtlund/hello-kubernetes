// Import required libraries
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

// Create Express instance, and define port
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the public directory
// Middleware function that tells Express where to look for files
app.use(express.static(path.join(__dirname, "public")));

// ======== DEFINE PATHS ========
// Define route handler for default home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "homepage.html"));
});

// Define route handler for date and time page
app.get("/datetime", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "datetime.html"));
});

// Define route handler for Kubernetes intro page
app.get("/k8s1-intro", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "k8s1-intro.html"));
});

// Define route handler for Kubernetes learning page
app.get("/k8s2-theory", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "k8s2-theory.html"));
});

// Define route handler for Kubernetes quiz page
app.get("/k8s3-quiz", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "k8s3-quiz.html"));
});

// ======== HOME PAGE FUNCTIONALITY ========
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

// ======== DATE AND TIME FUNCTIONALITY ========
// Define route handler to get current date and time with time zone
app.get("/currentdatetime", (req, res) => {
  const currentTimestamp = Date.now(); // Get current UTC timestamp
  res.json({ timestamp: currentTimestamp });
});

// ======== KUBERNETES FUNCTIONALITY ========
// Array to store simulated replica count
let appState = {
  replicaCount: 3,
};

// Route handler to get current replica count
app.get("/api/replicaCount", (req, res) => {
  res.json({ replicaCount: appState.replicaCount });
});

// Route handler to scale up, increase the replica count
app.post("/api/scaleUp", (req, res) => {
  appState.replicaCount++;
  res.json({ message: "Scaled up!", replicaCount: appState.replicaCount });
});

// Route handler to scale down, decrease the replica count
app.post("/api/scaleDown", (req, res) => {
  if (appState.replicaCount > 1) {
    appState.replicaCount--;
    res.json({ message: "Scaled down!", replicaCount: appState.replicaCount });
  } else {
    res.status(400).json({ error: "Cannot scale below 1 replica!" });
  }
});

// Start app, callback function for when application starts
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
