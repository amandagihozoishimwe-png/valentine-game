const cat = document.getElementById("cat");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

let yesScale = 1;

// Navigate between story steps
function nextStep(stepNumber) {
  // Hide all steps
  document.querySelectorAll(".step").forEach((step) => {
    step.classList.remove("active");
  });

  // Show target step
  const targetStep = document.getElementById(`step${stepNumber}`);
  if (targetStep) {
    targetStep.classList.add("active");
  }

  // Make cat happy briefly on each progression
  setCatExpression("happy");
  setTimeout(() => {
    if (stepNumber !== 8) setCatExpression("normal");
  }, 1200);
}

// Change cat facial expression
function setCatExpression(mood) {
  cat.classList.remove("happy", "sad");
  if (mood === "happy") cat.classList.add("happy");
  if (mood === "sad") cat.classList.add("sad");
}

// Runaway "No" Button Logic
function moveNoButton() {
  setCatExpression("sad");

  // Calculate safe random coordinates within the viewport
  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 20;

  const randomX = Math.max(10, Math.floor(Math.random() * maxX));
  const randomY = Math.max(10, Math.floor(Math.random() * maxY));

  noBtn.style.position = "fixed";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  // Make the "Yes" button slightly bigger each time they try to click "No"
  yesScale += 0.12;
  yesBtn.style.transform = `scale(${yesScale})`;
}

// Trigger dodge on hover (desktop) and touch (mobile)
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Handle "Yes" click
function acceptValentine() {
  nextStep(8);
  setCatExpression("happy");
}
