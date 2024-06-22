// Client-side functionality for the home page

// Function to create HTML element for displaying a review
function createReviewElement(review) {
  const reviewElement = document.createElement("div");
  reviewElement.innerHTML = `
    <h3 class="review-title">${review.title}</h3>
    <p class="review-text">${review.content}</p>
    <button onclick="editReview(${review.id})" class="button">Edit</button>
    <button onclick="deleteReview(${review.id})" class="button">Delete</button>
  `;
  return reviewElement;
}

// Function to fetch and display existing reviews
function fetchAndDisplayReviews() {
  fetch("/api/reviews")
    .then((response) => response.json())
    .then((reviews) => {
      const reviewsList = document.getElementById("reviewsList");
      reviewsList.innerHTML = "";
      reviews.forEach((review) =>
        reviewsList.appendChild(createReviewElement(review))
      );
    });
}

// Function to handle form submission to add a new review
function handleReviewFormSubmission(event) {
  event.preventDefault();
  const title = document.getElementById("reviewTitle").value;
  const content = document.getElementById("reviewContent").value;

  fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  })
    .then((response) => response.json())
    .then(() => {
      fetchAndDisplayReviews();
      document.getElementById("reviewForm").reset();
    });
}

// Function to handle review editing
function editReview(reviewId) {
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

  fetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  })
    .then((response) => response.json())
    .then(() => fetchAndDisplayReviews());
}

// Function to delete a review
function deleteReview(reviewId) {
  fetch(`/api/reviews/${reviewId}`, { method: "DELETE" })
    .then((response) =>
      response.ok
        ? fetchAndDisplayReviews()
        : console.error("Failed to delete review")
    )
    .catch((error) => console.error("Error deleting review:", error));
}

// Function to fetch and display a fun fact
function fetchAndDisplayFunFact() {
  fetch("/content/funfacts.json")
    .then((response) => response.json())
    .then((funFacts) => {
      const randomIndex = Math.floor(Math.random() * funFacts.length);
      document.getElementById("funFact").textContent = funFacts[randomIndex];
    })
    .catch((error) => console.error("Error fetching fun facts:", error));
}

// Handle event listeners on respective pages
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/") {
    fetchAndDisplayReviews();
    fetchAndDisplayFunFact();
    // Attach the form submission handler
    document
      .getElementById("reviewForm")
      .addEventListener("submit", handleReviewFormSubmission);
  }
});
