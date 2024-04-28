// Fetch current date and time from the server and update the DOM
fetch("/currentdatetime")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("currentDateTime").textContent = data.datetime;
  });
