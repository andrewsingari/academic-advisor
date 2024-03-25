// Get the background image URL
const backgroundImageUrl = '../img/map.png'; // Replace with the actual URL

// Define the positions for each button along with hover information
const buttonData = [
  { label: '1', top: '59.5%', left: '54%', hoverInfo: 'Campus Services' },
  { label: '2', top: '56%', left: '73.5%', hoverInfo: 'CANIL Harvest Centre' },
  { label: '3', top: '30.5%', left: '38.5%', hoverInfo: 'Catholic Pacific College' },
  { label: '4', top: '43%', left: '65%', hoverInfo: 'David E. Enarson Gymnasium' },
  { label: '5', top: '47%', left: '77.5%', hoverInfo: 'DeVries Centre' },
  { label: '6', top: '55%', left: '50%', hoverInfo: 'Douglas Centre' },
  { label: '7', top: '59.5%', left: '47.5%', hoverInfo: 'Douglas Hall' },
  { label: '8', top: '55%', left: '67%', hoverInfo: 'Ezra House' },
  { label: '9', top: '58.5%', left: '75%', hoverInfo: 'Field House' },
  { label: '10', top: '47.5%', left: '35%', hoverInfo: 'Fire Pump House' },
  // Add more positions and hover information for additional buttons as needed
];

// Wait for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create buttons and set their positions
  buttonData.forEach(button => {
    createButton(button.label, button.top, button.left, button.hoverInfo);
  });
});

// Function to create a button with specified position and hover information
function createButton(label, top, left, hoverInfo) {
  const button = document.createElement('button');
  button.textContent = label;
  button.classList.add('background-button');
  button.style.top = top;
  button.style.left = left;
  
  // Set the hover information as a data attribute
  button.dataset.hoverInfo = hoverInfo;

  // Add event listeners for hover behavior
  button.addEventListener('mouseenter', showHoverInfo);
  button.addEventListener('mouseleave', hideHoverInfo);
  
  document.body.appendChild(button);
}

// Function to show hover information
function showHoverInfo(event) {
  const hoverInfo = event.target.dataset.hoverInfo;
  event.target.setAttribute('data-hover-content', hoverInfo);
}

// Function to hide hover information
function hideHoverInfo(event) {
  event.target.removeAttribute('data-hover-content');
}
