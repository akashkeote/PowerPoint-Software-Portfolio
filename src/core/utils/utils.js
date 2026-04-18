export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getCurrentSlideIndex() {
  const activeSlide = document.querySelector('.slide.active');
  if (!activeSlide) return 0;
  const slides = document.querySelectorAll('.slide-wrapper .slide');
  return Array.from(slides).indexOf(activeSlide);
}
