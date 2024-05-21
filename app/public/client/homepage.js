// Client-side functionality for the home page

// Function to create HTML element for displaying a greeting
function createGreetingElement(greeting) {
  const greetingElement = document.createElement("div");
  greetingElement.innerHTML = `
          <h3 class="greeting-title">${greeting.title}</h3>
          <p class="greeting-text">${greeting.content}</p>
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
      greetings.forEach((greeting) => {
        const greetingElement = createGreetingElement(greeting);
        greetingsList.appendChild(greetingElement);
      });
    });
}

// Handle form submission to add a new greeting
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  // Check if the user is on the home page
  if (currentPath === "/") {
    document
      .getElementById("greetingForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("greetingTitle").value;
        const content = document.getElementById("greetingContent").value;

        fetch("/api/greetings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        })
          .then((response) => response.json())
          .then((newGreeting) => {
            fetchAndDisplayGreetings();
            document.getElementById("greetingForm").reset();
          });
      });
  }
});

// Function to delete a greeting
function deleteGreeting(greetingId) {
  fetch(`/api/greetings/${greetingId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        fetchAndDisplayGreetings();
      } else {
        console.error("Failed to delete greeting");
      }
    })
    .catch((error) => {
      console.error("Error deleting greeting:", error);
    });
}

// Handle event listeners on respective pages
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/") {
    fetchAndDisplayGreetings();
  }
});
