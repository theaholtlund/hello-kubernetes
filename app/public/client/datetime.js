// Client-side functionality for the date and time page

// Helper function to fetch and display date and time
function fetchAndDisplayDateTime(url, elementId, options = {}) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch datetime from ${url}`);
      }
      return response.json();
    })
    .then((data) => {
      const dateTime = new Date(data.timestamp);
      const dayOfWeek = dateTime.toLocaleString("en-US", {
        weekday: "long",
        ...options,
      });
      const dateTimeString = `${dayOfWeek} ${dateTime.toLocaleString(
        "en-US",
        options
      )}`;
      document.getElementById(elementId).textContent = dateTimeString;
    })
    .catch((error) => {
      console.error(`Error fetching datetime from ${url}:`, error);
    });
}

// Function to fetch and display the user's local current date and time
function fetchAndDisplayLocalTime() {
  fetchAndDisplayDateTime("/currentdatetime", "localDateTime", {
    hour12: false,
  });
}

// Function to fetch and display the current date and time in GMT
function fetchAndDisplayGmtTime() {
  fetchAndDisplayDateTime("/currentdatetime?timezone=GMT", "gmtDateTime", {
    timeZone: "GMT",
    hour12: false,
  });
}

// Function to fetch and display the current time in the selected time zone
function fetchAndDisplayTimezoneTime(timezone) {
  fetchAndDisplayDateTime(
    `/currentdatetime?timezone=${timezone}`,
    "timezoneTime",
    { timeZone: timezone, hour12: false }
  );
}

// Function to initialise time zone select event listener
function initialiseTimezoneSelect() {
  const timezoneSelect = document.getElementById("timezoneSelect");
  timezoneSelect.addEventListener("change", (event) => {
    fetchAndDisplayTimezoneTime(event.target.value);
  });

  fetchAndDisplayTimezoneTime(timezoneSelect.value);
}

// Function to fetch and display quote on time
function fetchAndDisplayQuote() {
  fetch("/content/timequotes.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch quotes");
      }
      return response.json();
    })
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const quote = data[randomIndex];
      const quoteText = `"${quote.quote}" – ${quote.author}`;
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
    initialiseTimezoneSelect();
    fetchAndDisplayQuote();
  }
});
