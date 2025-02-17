// Client-side functionality for the Kubernetes page

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

// Function to show and hide the loading indicator
function setLoading(loading) {
  const loadingIndicator = document.getElementById("loadingIndicator");
  if (loading) {
    loadingIndicator.style.display = "block";
  } else {
    loadingIndicator.style.display = "none";
  }
}

// Function to scale up, increase the replica count
function scaleUp() {
  setLoading(true);
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
    .catch((error) => console.error("Error scaling up:", error))
    .finally(() => setLoading(false));
}

// Function to scale down, decrease the replica count
function scaleDown() {
  setLoading(true);
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
    })
    .finally(() => setLoading(false));
}

// Function to initialise the scaling simulation
function initialiseScaling() {
  setLoading(true);
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
    .catch((error) => console.error("Error initialising scaling:", error))
    .finally(() => setLoading(false));
}

// Function to load the quiz content dynamically
function loadQuiz() {
  fetch("k8s3-quiz.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load quiz");
      }
      return response.text();
    })
    .then((html) => {
      const quizContent = new DOMParser()
        .parseFromString(html, "text/html")
        .querySelector("#quiz-container").innerHTML;
      document.getElementById("quiz-container").innerHTML = quizContent;
    })
    .catch((error) => console.error("Error loading quiz:", error));
}

// Functionality to check the answer for quiz questions
let triesCount = 0;

function checkAnswer(questionId, selectedAnswer) {
  const answers = {
    q1: "a",
    q2: "b",
    q3: "a",
  };

  const feedbackElement = document.getElementById(`${questionId}-feedback`);

  if (selectedAnswer === answers[questionId]) {
    feedbackElement.textContent = "Correct! Well done!";
    feedbackElement.style.color = "green";
  } else {
    feedbackElement.textContent = "Incorrect. Please try again.";
    feedbackElement.style.color = "red";
  }

  // Check if all questions are correct
  if (correctAnswers()) {
    triesCount++;
    document.getElementById(
      "tries-feedback"
    ).innerHTML = `You got all answers correct in <span style="color: #ffb86e;">${triesCount}</span> tries!`;
  } else {
    triesCount++;
  }
}

// Function to check if all answers are correct
function correctAnswers() {
  const answers = {
    q1: "a",
    q2: "b",
    q3: "a",
  };

  return Object.keys(answers).every((questionId) => {
    const feedbackElement = document.getElementById(`${questionId}-feedback`);
    return feedbackElement.textContent === "Correct! Well done!";
  });
}

// Handle event listeners on respective pages
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/k8s1-intro") {
    initialiseScaling();
  }
  if (window.location.pathname === "/k8s3-quiz") {
    loadQuiz();
  }
});
