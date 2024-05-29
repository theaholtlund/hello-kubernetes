// Client-side functionality for the home page

// Function to create HTML element for displaying a greeting
function createGreetingElement(greeting) {
  const greetingElement = document.createElement("div");
  greetingElement.innerHTML = `
    <h3 class="greeting-title">${greeting.title}</h3>
    <p class="greeting-text">${greeting.content}</p>
    <button onclick="editGreeting(${greeting.id})" class="button">Edit</button>
    <button onclick="deleteGreeting(${greeting.id})" class="button">Delete</button>
  `;
  return greetingElement;
}

// Function to fetch and display existing greetings
function fetchAndDisplayGreetings() {
  fetch("/api/greetings")
    .then((response) => response.json())
    .then((greetings) => {
      const greetingsList = document.getElementById("greetingsList");
      greetingsList.innerHTML = "";
      greetings.forEach((greeting) =>
        greetingsList.appendChild(createGreetingElement(greeting))
      );
    });
}

// Function to handle form submission to add a new greeting
function handleGreetingFormSubmission(event) {
  event.preventDefault();
  const title = document.getElementById("greetingTitle").value;
  const content = document.getElementById("greetingContent").value;

  fetch("/api/greetings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  })
    .then((response) => response.json())
    .then(() => {
      fetchAndDisplayGreetings();
      document.getElementById("greetingForm").reset();
    });
}

// Function to handle greeting editing
function editGreeting(greetingId) {
  const title = prompt("Enter new title:");
  const content = prompt("Enter new content:");

  // Quality check to ensure title and content are not empty
  if (!title || !content) {
    alert("Both title and content are required to edit the greeting.");
    return; // Exit the function if validation fails
  }

  fetch(`/api/greetings/${greetingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  })
    .then((response) => response.json())
    .then(() => fetchAndDisplayGreetings());
}

// Function to delete a greeting
function deleteGreeting(greetingId) {
  fetch(`/api/greetings/${greetingId}`, { method: "DELETE" })
    .then((response) =>
      response.ok
        ? fetchAndDisplayGreetings()
        : console.error("Failed to delete greeting")
    )
    .catch((error) => console.error("Error deleting greeting:", error));
}

// Handle event listeners on respective pages
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/") {
    fetchAndDisplayGreetings();
    // Attach the form submission handler
    document
      .getElementById("greetingForm")
      .addEventListener("submit", handleGreetingFormSubmission);
  }
});
