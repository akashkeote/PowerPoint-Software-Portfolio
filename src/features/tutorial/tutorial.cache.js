const imageCache = new Map();

export function preloadImages(steps) {
  const urls = new Set();
  steps.forEach(s => { if (s.charImage) urls.add(s.charImage); });
  urls.forEach(url => {
    if (!imageCache.has(url)) {
      const img = new Image();
      img.src = url;
      imageCache.set(url, img);
    }
  });
}

export function getCachedImage(url) {
  return imageCache.get(url);
}
