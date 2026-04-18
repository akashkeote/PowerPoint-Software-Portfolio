import { fetchWithCache } from './scrollytelling.cache.js';

export async function loadSingleFrame(index, scrubImages, counter) {
  const num = index.toString().padStart(3, '0');
  const url = '/sequence/frame_' + num + '_delay-0.033s.webp';

  try {
    const blob = await fetchWithCache(url);
    const bitmap = await createImageBitmap(blob);
    scrubImages[index] = bitmap;
    counter.loaded++;

    if (typeof window.updateBootProgress === 'function') {
      window.updateBootProgress(counter.loaded, counter.total);
    }
  } catch (err) {
    console.log('Frame skip: ' + index);
    counter.loaded++;
  }
}

export function buildExpectedFrames(totalFrames, isMobile, slideAnchors) {
  const frames = [];
  for (let i = 0; i < totalFrames; i++) {
    if (isMobile && i % 2 !== 0 && !slideAnchors.includes(i)) continue;
    frames.push(i);
  }
  return frames;
}

export async function preloadAllFrames(
  expectedFrames, slideAnchors, scrubImages,
  counter, concurrency, onKeyframesReady, isMobile
) {
  const keyframePromises = slideAnchors.map(idx => loadSingleFrame(idx, scrubImages, counter));
  await Promise.all(keyframePromises);

  onKeyframesReady();

  const remaining = [];
  for (const frameIndex of expectedFrames) {
    if (!scrubImages[frameIndex]) remaining.push(frameIndex);
  }

  for (let i = 0; i < remaining.length;) {
    const batch = [];
    for (let j = 0; j < concurrency && i < remaining.length; j++, i++) {
      batch.push(loadSingleFrame(remaining[i], scrubImages, counter));
    }
    await Promise.all(batch);
  }

  console.log('[Scrubber] All ' + counter.loaded + ' frames cached' + (isMobile ? ' (mobile)' : ''));
  if (typeof window.onAllFramesCached === 'function') window.onAllFramesCached();
  window.dispatchEvent(new Event('bootComplete'));
}
