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
// Array to store reviews data
let reviews = [];

// Route handler to get all reviews
app.get("/api/reviews", (req, res) => {
  res.json(reviews);
});

// Route handler to add a new review
app.post("/api/reviews", (req, res) => {
  const { title, content } = req.body;
  const newReview = { id: reviews.length + 1, title, content };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

// Route handler to update a review
app.put("/api/reviews/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const reviewToUpdate = reviews.find((review) => review.id === id);
  if (!reviewToUpdate) {
    return res.status(404).json({ error: "Review not found" });
  }
  reviewToUpdate.title = title;
  reviewToUpdate.content = content;
  res.json(reviewToUpdate);
});

// Route handler to delete a review
app.delete("/api/reviews/:id", (req, res) => {
  const id = parseInt(req.params.id);
  reviews = reviews.filter((review) => review.id !== id);
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
