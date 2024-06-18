// Create footer element
const footer = document.createElement("footer");
footer.classList.add("footer");

// Define footer content
const footerContent = `
  <p>This app was created by Thea Holtlund Jacobsen</p>
  <p>&copy; 2024, My Kubernetes App. All rights reserved.</p>
`;

// Set footer content
footer.innerHTML = footerContent;

// Append footer to document body
document.body.appendChild(footer);
