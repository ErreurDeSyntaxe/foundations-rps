'use strict';

let slideIndex = 0;
slideImages();

function slideImages() {
  const carouselImgs = document.querySelectorAll('.hero-img');

  for (let i = 0; i < carouselImgs.length; i++) {
    carouselImgs[i].style.opacity = '0';
  }

  slideIndex++;
  if (slideIndex > carouselImgs.length) slideIndex = 1;
  carouselImgs[slideIndex - 1].style.opacity = '1';
  setTimeout(slideImages, 5000);
}
