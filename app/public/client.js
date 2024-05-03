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

// Function to update replica count display
function updateReplicaCount(replicaCount) {
  document.getElementById("replicaCount").textContent = replicaCount;
}

// Function to scale up, increase the replica count
function scaleUp() {
  fetch("/api/scaleUp", { method: "POST" })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to scale up");
      }
    })
    .then((data) => {
      updateReplicaCount(data.replicaCount);
      alert(data.message);
    })
    .catch((error) => console.error("Error scaling up:", error));
}

// Function to scale down, decrease the replica count
function scaleDown() {
  fetch("/api/scaleDown", { method: "POST" })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to scale down");
      }
    })
    .then((data) => {
      updateReplicaCount(data.replicaCount);
      alert(data.message);
    })
    .catch((error) => console.error("Error scaling down:", error));
}

// Function to initialise the scaling simulation
function initialiseScaling() {
  fetch("/api/replicaCount")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch replica count");
      }
    })
    .then((data) => {
      updateReplicaCount(data.replicaCount);
    })
    .catch((error) => console.error("Error initialising scaling:", error));
}

// Call the initialiseScaling function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initialiseScaling);

// Initial fetch and display of greetings on page load
fetchAndDisplayGreetings();
