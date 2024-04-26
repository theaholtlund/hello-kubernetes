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

// Array to store notes data
let notes = [];

// Route handler to get all notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// Route handler to add a new note
app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: notes.length + 1, title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// Route handler to update a note
app.put("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const noteToUpdate = notes.find((note) => note.id === id);
  if (!noteToUpdate) {
    return res.status(404).json({ error: "Note not found" });
  }
  noteToUpdate.title = title;
  noteToUpdate.content = content;
  res.json(noteToUpdate);
});

// Default route handler
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
