let valueDisplays = document.querySelectorAll(".num")
let interval = 5000
valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"))
    let duration = Math.floor(interval / endValue)
    let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue
        if (startValue == endValue) {
            clearInterval(counter)
        }
    }, duration)
})

const slider = document.querySelector('.slider');
const dotsContainer = document.querySelector('.slider-dots');
const autoSlideInterval = 5000; // Change the interval as needed (in milliseconds)
let slideIndex = 0;
let intervalId;
let isDragging = false;
let startX;
let scrollLeft;

slider.addEventListener('scroll', () => {
  const slides = document.querySelectorAll('.slide');
  const currentSlide = Math.round(slider.scrollLeft / slides[0].offsetWidth);
  updateDots(currentSlide);
});

function createDots() {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });
}

function updateDots(currentSlide) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.slide');
  slider.scrollLeft = slides[0].offsetWidth * index;
  slideIndex = index;
}

function autoSlide() {
  intervalId = setInterval(() => {
    slideIndex++;
    if (slideIndex >= document.querySelectorAll('.slide').length) {
      slideIndex = 0;
    }
    goToSlide(slideIndex);
  }, autoSlideInterval);
}

function stopAutoSlide() {
  clearInterval(intervalId);
}

createDots();
autoSlide();

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    stopAutoSlide();
  });
  
  slider.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      autoSlide();
    }
  });
  
  slider.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      autoSlide();
    }
  });
  
  slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.clientX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
  });