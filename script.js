// =============================================
// STEP 1: Set up the image array 
// =============================================
// Array of all images to cycle through
// Customize these paths to your own images
const images = [
  './assets/image-content/image-1.png',
  './assets/image-content/image-2.png',
  './assets/image-content/image-3.png',
  './assets/image-content/image-4.png',
  './assets/image-content/image-5.png',
  './assets/image-content/image-6.png'
];

// =============================================
// STEP 2: Reference HTML elements 
// =============================================
// Connect to the elements we need to change
const headerText = document.querySelector('h1');
const imageContent = document.querySelector('.image-content');  // Image container
const allButtons = document.querySelectorAll('.image-button');   // Image switch button
const finalSection = document.querySelector('.final-section');
const resetButton = document.getElementById('reset-button');
const cardButton = document.getElementById('card-button');

// Progress bar elements
const levelLabel = document.getElementById('level-label');
const barFill = document.getElementById('bar-fill');

// Overlay
const overlay = document.getElementById('card-overlay');
const closeCardButton = document.getElementById('close-card');

// Levels correspond to image order
const levels = [0, 3, 8, 16, 20, 21];

// =============================================
// STEP 3: Track what image we're at 
// =============================================
// Start with the first image (index 0)
let currentIndex = 0;

// =============================================
// STEP 4: Update image function 
// =============================================
// Function to change images with fade effect
function updateImage() {
  // Fade out current image
  imageContent.style.opacity = 0;
  
  // Preload next image
  const img = new Image();
  img.src = images[currentIndex];
  
  // When image is loaded
  img.onload = () => {
    // Change to new image
    imageContent.style.backgroundImage = `url('${images[currentIndex]}')`;
    
    // Fade in new image
    imageContent.style.opacity = 1;
  };

  // 更新等級
  levelLabel.textContent = `Lv.${levels[currentIndex]}`;
  const percent = (currentIndex + 1) / images.length * 100;
  barFill.style.width = `${percent}%`;

  if (currentIndex === 0) {
    finalSection.style.display = 'none';
  }
}

// =============================================
// STEP 5: Initial image display 
// =============================================
// Show first image when page loads
updateImage();

// =============================================
// STEP 6: Button click handler 
// =============================================
// Change image when button is clicked
allButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentIndex++;

    if (currentIndex < images.length) {
      updateImage();

      if (currentIndex === images.length - 1) {
        allButtons.forEach(btn => btn.style.display = 'none');
        finalSection.style.display = 'flex';
        headerText.textContent = '\\ 任務完成！ /';
      }
    }
  });
});

resetButton.addEventListener('click', () => {
  currentIndex = 0;
  updateImage();

  allButtons.forEach(btn => btn.style.display = 'inline-flex');
  finalSection.style.display = 'none';
  headerText.textContent = '任務提示：養大這個小屁孩！';
});

// Placeholder for card button
cardButton.addEventListener('click', () => {
  overlay.style.display = 'flex';
  overlay.classList.add('show');
});

closeCardButton.addEventListener('click', () => {
  overlay.classList.remove('show');
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 400);
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.remove('show');
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 400);
  }
});