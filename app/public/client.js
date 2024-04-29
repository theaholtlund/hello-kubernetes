// Function to handle dropdown menu behavior
function toggleDropdownMenu(show) {
  const dropdownMenu = document.getElementById("dropdownMenu");
  dropdownMenu.classList.toggle("show", show);
}

// Event listeners to show/hide dropdown menu on hover
document
  .querySelector(".dropdown-container")
  .addEventListener("mouseenter", () => {
    toggleDropdownMenu(true);
  });

document
  .querySelector(".dropdown-container")
  .addEventListener("mouseleave", () => {
    toggleDropdownMenu(false);
  });

// Close the dropdown menu if the user clicks outside of it
window.addEventListener("click", (event) => {
  if (
    !event.target.matches(".dropdown-button") &&
    !event.target.closest(".dropdown-content")
  ) {
    toggleDropdownMenu(false);
  }
});

// Close the dropdown menu if the user clicks outside of it
window.addEventListener("click", (event) => {
  if (!event.target.matches(".dropdown-button")) {
    const dropdownMenus = document.getElementsByClassName("dropdown-content");
    Array.from(dropdownMenus).forEach((menu) => {
      if (menu.classList.contains("show")) {
        menu.classList.remove("show");
      }
    });
  }
});

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
document.getElementById("greetingForm").addEventListener("submit", (event) => {
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

// Fetch current date and time from the server and update the DOM
fetch("/currentdatetime")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("currentDateTime").textContent = data.datetime;
  });

// Initial fetch and display of greetings on page load
fetchAndDisplayGreetings();
