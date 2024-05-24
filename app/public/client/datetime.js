// Client-side functionality for the date and time page

// Function to fetch and display the user's local current date and time
function fetchAndDisplayLocalTime() {
  fetch("/currentdatetime")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch local datetime");
      }
      return response.json();
    })
    .then((data) => {
      const localTimestamp = data.timestamp;
      const localDateTime = new Date(localTimestamp);
      const localDateTimeString = localDateTime.toLocaleString("en-US");
      const localDateTimeElement = document.getElementById("localDateTime");
      localDateTimeElement.textContent = localDateTimeString;
    })
    .catch((error) => {
      console.error("Error fetching local datetime:", error);
    });
}

// Function to fetch and display the current date and time in GMT
function fetchAndDisplayGmtTime() {
  fetch("/currentdatetime?timezone=GMT")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch GMT datetime");
      }
      return response.json();
    })
    .then((data) => {
      const gmtTimestamp = data.timestamp;
      const gmtDateTime = new Date(gmtTimestamp);
      const options = { timeZone: "GMT" };
      const gmtDateTimeString = gmtDateTime.toLocaleString("en-US", options);
      const gmtDateTimeElement = document.getElementById("gmtDateTime");
      gmtDateTimeElement.textContent = gmtDateTimeString;
    })
    .catch((error) => {
      console.error("Error fetching GMT datetime:", error);
    });
}

// Function to fetch and display quote on time
function fetchAndDisplayQuote() {
  fetch("/quote")
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

// Handle event listeners on respective pages
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/datetime") {
    fetchAndDisplayLocalTime();
    fetchAndDisplayGmtTime();
    fetchAndDisplayQuote();
  }
});
