// Client-side functionality for the date and time page

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

      document.getElementById("currentDateTime").textContent =
        new Intl.DateTimeFormat(navigator.language, dateTimeOptions).format(
          serverDateTime
        );
    })
    .catch((error) => {
      console.error("Error fetching current datetime:", error);
    });
}

// Function to fetch and display quote on time
function fetchAndDisplayQuote() {
  fetch("https://api.quotable.io/random?tags=time")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById(
        "quoteText"
      ).textContent = `"${data.content}" – ${data.author}`;
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
      document.getElementById("quoteText").textContent =
        "Failed to fetch quote. Please try again later.";
    });
}

// Handle event listeners on respective pages
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/datetime") {
    fetchAndDisplayCurrentDateTime();
    fetchAndDisplayQuote();
  }
});
