// Create navbar element
const navbar = document.createElement("div");
navbar.classList.add("navbar");

// Define navbar content
const navbarContent = `
  <a href="/" class="nav-link">Home</a>
  <a href="/datetime" class="nav-link">Date and Time</a>
  <a href="/k8s1-intro" class="nav-link">Kubernetes Intro</a>
  <a href="/k8s2-theory" class="nav-link">Kubernetes Theory</a>
  <a href="/k8s3-quiz" class="nav-link">Kubernetes Quiz</a>
`;

// Set navbar content
navbar.innerHTML = navbarContent;

// Prepend navbar to document body
document.body.prepend(navbar);
