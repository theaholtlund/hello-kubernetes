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
  let title = "";
  let content = "";

  while (!title) {
    title = prompt("Enter new title:");
    if (!title) {
      alert("Title cannot be empty. Please enter a title.");
    }
  }

  while (!content) {
    content = prompt("Enter new content:");
    if (!content) {
      alert("Content cannot be empty. Please enter content.");
    }
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

// Function to fetch and display a fun fact
function fetchAndDisplayFunFact() {
  const funFacts = [
    "The longest year in history was 46 B.C., which lasted 445 days!",
    "A day on Venus is longer than a year on Venus.",
    "The Eiffel Tower can be 15 cm taller during the summer due to the expansion of iron in the heat.",
    "In botanical terms, bananas qualify as berries, while strawberries do not.",
    "Occasionally, a leap second is added to UTC to account for irregularities in the Earth's rotation.",
    "Atomic clocks are so precise they can measure time to within a billionth of a second.",
    "In the 18th century, pineapples were a symbol of wealth and hospitality.",
    "Sea otters hold hands while sleeping to stay together.",
    "Ancient Egyptians used a star called Sirius to help them keep track of the time of year.",
    "A bolt of lightning contains enough energy to toast 100,000 slices of bread.",
  ];
  const randomIndex = Math.floor(Math.random() * funFacts.length);
  document.getElementById("funFact").textContent = funFacts[randomIndex];
}

// Handle event listeners on respective pages
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/") {
    fetchAndDisplayGreetings();
    fetchAndDisplayFunFact();
    // Attach the form submission handler
    document
      .getElementById("greetingForm")
      .addEventListener("submit", handleGreetingFormSubmission);
  }
});
