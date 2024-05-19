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

// Function to fetch and display the current date and time
function fetchAndDisplayCurrentDateTime() {
  fetch("/currentdatetime")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch current datetime");
      }
      return response.json();
    })
    .then((data) => {
      const serverTimestamp = data.timestamp;
      const serverDateTime = new Date(serverTimestamp);

      const dateTimeOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };

      const formattedDateTime = new Intl.DateTimeFormat(
        navigator.language,
        dateTimeOptions
      ).format(serverDateTime);

      const currentDateTimeElement = document.getElementById("currentDateTime");
      currentDateTimeElement.textContent = formattedDateTime;
    })
    .catch((error) => {
      console.error("Error fetching current datetime:", error);
    });
}

function fetchAndDisplayQuote() {
  fetch("https://api.quotable.io/random?tags=time")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      return response.json();
    })
    .then((data) => {
      const quoteText = `"${data.content}" – ${data.author}`;
      document.getElementById("quoteText").textContent = quoteText;
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
      document.getElementById("quoteText").textContent =
        "Failed to fetch quote. Please try again later.";
    });
}

// Function to update replica count display and visualisation
function updateReplicaCount(replicaCount) {
  document.getElementById("replicaCount").textContent = replicaCount;

  const replicaVisualisation = document.getElementById("replicaVisualisation");
  replicaVisualisation.innerHTML = "";

  for (let i = 0; i < replicaCount; i++) {
    const packageImage = document.createElement("img");
    packageImage.src = "graphics/package.png";
    packageImage.className = "package-image";
    replicaVisualisation.appendChild(packageImage);
  }
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
        return response.json().then((data) => {
          throw new Error(data.error); // Throw error with specific message
        });
      }
    })
    .then((data) => {
      updateReplicaCount(data.replicaCount);
      alert(data.message);
    })
    .catch((error) => {
      console.error("Error scaling down:", error);
      if (error.message === "Cannot scale replica count below 1!") {
        alert(error.message);
      } else {
        alert("Failed to scale down: " + error.message); // General error message
      }
    });
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

// Handle event listeners on respective pages
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  // Check if user is on the home page
  if (currentPath === "/") {
    fetchAndDisplayGreetings();
  }

  // Check if user is on the datetime page
  if (currentPath === "/datetime") {
    fetchAndDisplayCurrentDateTime();
    fetchAndDisplayQuote();
  }

  // Check if user is on the Kubernetes page
  if (currentPath === "/kubernetes") {
    initialiseScaling();
  }
});
