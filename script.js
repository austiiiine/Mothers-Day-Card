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

// references to HTML elements 
const headerText = document.querySelector('h1');
const imageContent = document.querySelector('.image-content');
const mainButtons = document.querySelectorAll('.image-button');
const finalSection = document.querySelector('.final-section');
const restartButton = document.getElementById('restart-button');
const cardButton = document.getElementById('card-button');
const levelLabel = document.getElementById('level-label');
const barFill = document.getElementById('bar-fill');
const overlay = document.getElementById('card-overlay');
const closeCardButton = document.getElementById('close-card');

// levels correspond to image order
const levels = [0, 3, 8, 16, 20, 21];

const clickSound = new Audio('./assets/sfx/click.wav');
const restartSound = new Audio('./assets/sfx/restart.wav');
const popupSound = new Audio('./assets/sfx/popup.wav');

// image index tracker
let currentIndex = 0;

// image update
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

  // update lvl
  levelLabel.textContent = `Lv.${levels[currentIndex]}`;
  const percent = (currentIndex + 1) / images.length * 100;
  barFill.style.width = `${percent}%`;

  if (currentIndex === 0) {
    finalSection.style.display = 'none';
  }
}

// initial image display
updateImage();


function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function playRestartSound() {
  restartSound.currentTime = 0;
  restartSound.play();
}

function playPopupSound() {
  popupSound.currentTime = 0;
  popupSound.play();
}

function showFloatingText(text, x, y) {
  const floating = document.createElement('div');
  floating.className = 'floating-text';
  floating.textContent = text;
  document.body.appendChild(floating);

  // retrieve height and width
  requestAnimationFrame(() => {
    const width = floating.offsetWidth;
    const height = floating.offsetHeight;

    floating.style.left = `${x - width / 2}px`;
    floating.style.top = `${y - height}px`;
  });

  // position where clicked
  floating.style.left = `${x}px`;
  floating.style.top = `${y-30}px`;

  // remove element after 1 sec
  setTimeout(() => {
    floating.remove();
  }, 1000);
}


// button click handlers

// main buttons - change image when button is clicked
mainButtons.forEach(button => {
  button.addEventListener('click', () => {
    playClickSound();
    currentIndex++;

    // calculate floating text position
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top;

    showFloatingText('Level Up!', centerX, centerY);

    if (currentIndex < images.length) {
      updateImage();

      if (currentIndex === images.length - 1) {
        mainButtons.forEach(btn => btn.style.display = 'none');
        finalSection.style.display = 'flex';
        headerText.textContent = '\\ 任務完成！ /';
      }
    }
  });
});

// restart button
restartButton.addEventListener('click', () => {
  playRestartSound();
  currentIndex = 0;
  updateImage();

  mainButtons.forEach(btn => btn.style.display = 'inline-flex');
  finalSection.style.display = 'none';
  headerText.textContent = '任務提示：養大這個小屁孩！';
});

// card button
cardButton.addEventListener('click', () => {
  playPopupSound();
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