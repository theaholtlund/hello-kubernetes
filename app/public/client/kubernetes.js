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

// Function to check the answer for quiz questions
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
