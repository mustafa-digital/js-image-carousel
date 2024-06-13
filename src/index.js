import './style.css';
import imgSrc1 from './assets/images/neom-ljEXet84nL8-unsplash.jpg';
import imgSrc2 from './assets/images/ines-alvarez-fdez-hKug0W1tnVU-unsplash.jpg';
import imgSrc3 from './assets/images/eddie-suh-jC-uNQyP-Gc-unsplash.jpg';
import imgSrc4 from './assets/images/linda-gerbec-0wvMLaScXU0-unsplash.jpg';

const IMAGE_WIDTH = 800;
const slider = document.querySelector('.image-slides');

let currentImage = 0;
let dots;
let LAST_IMAGE;
const FIRST_IMAGE = 0;
let timerId;

function loadImages (images, imageSources) {
  let i = 0;
  images.forEach(image => {
    image.src = imageSources[i];
    image.style.width = IMAGE_WIDTH + 'px';
    i++;
  });
}

document.addEventListener('DOMContentLoaded', (e) => {
  const images = Array.from(document.querySelectorAll('img'));
  const imageSources = [imgSrc1, imgSrc2, imgSrc3, imgSrc4];
  LAST_IMAGE = imageSources.length - 1;
  loadImages(images, imageSources);

  dots = createNavDots(images);
  dots.forEach(dot => {
    dot.addEventListener('click', dotClickEvent);
  })
  dots[FIRST_IMAGE].classList.toggle('selected');

  const left = document.querySelector('.left-arrow');
  const right = document.querySelector('.right-arrow');

  left.addEventListener('click', slideLeft);
  right.addEventListener('click', slideRight);

  resetSliderInterval();
});

function slideTo (index) {
  const translateBy = index * IMAGE_WIDTH;
  slider.style.transform = `translateX(-${translateBy}px)`;

  const previousImage = currentImage;
  currentImage = index;
  updateDots(previousImage);
}

function slideLeft () {
  resetSliderInterval();
  if (currentImage === 0) slideTo(LAST_IMAGE);
  else slideTo(currentImage - 1);
}

function slideRight () {
  resetSliderInterval();
  if (currentImage === LAST_IMAGE) slideTo(FIRST_IMAGE);
  else slideTo(currentImage + 1);
}

function createNavDots (images) {
  const navDot = document.querySelector('.nav-dots');
  const dots = [];

  for (const [i] of images.entries()) {
    const dot = document.createElement('span');
    dot.setAttribute('class', 'dot');
    dot.setAttribute('data-index', i);
    navDot.appendChild(dot);
    dots.push(dot);
  }
  return dots;
}

function dotClickEvent (event) {
  resetSliderInterval();
  const index = Number(event.target.dataset.index);
  slideTo(index);
}

function updateDots (previousImage) {
  dots[currentImage].classList.toggle('selected');
  dots[previousImage].classList.toggle('selected');
}

function resetSliderInterval () {
  clearInterval(timerId);
  timerId = window.setInterval(slideRight, 5000);
}
