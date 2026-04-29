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

/**
 * Binary subdivision: generates a load order that maximises
 * uniform coverage at every stage.
 * 
 * Given existing anchors [0, 43, 87, 130, 173] it will produce:
 *   Round 1 midpoints → [21, 65, 108, 151]
 *   Round 2 → midpoints of every adjacent pair
 *   ... until all expected frames are covered
 */
export function buildSubdivisionOrder(expectedFrames, slideAnchors) {
  const expectedSet = new Set(expectedFrames);
  const queued = new Set(slideAnchors.filter(a => expectedSet.has(a)));
  const order = [];

  // Seed: the anchor midpoints first
  let boundaries = [...slideAnchors].sort((a, b) => a - b);

  while (order.length + queued.size < expectedSet.size) {
    const nextBoundaries = [];
    const roundFrames = [];

    for (let i = 0; i < boundaries.length - 1; i++) {
      const mid = Math.round((boundaries[i] + boundaries[i + 1]) / 2);
      if (expectedSet.has(mid) && !queued.has(mid)) {
        roundFrames.push(mid);
        queued.add(mid);
      }
    }

    if (roundFrames.length === 0) {
      // No more midpoints possible, fill remaining sequentially
      break;
    }

    order.push(...roundFrames);

    // Build next boundary list from all queued sorted
    const allSorted = [...queued].sort((a, b) => a - b);
    boundaries.length = 0;
    boundaries.push(...allSorted);
  }

  // Append any remaining frames not yet queued
  for (const f of expectedFrames) {
    if (!queued.has(f)) {
      order.push(f);
      queued.add(f);
    }
  }

  return order;
}

export async function preloadAllFrames(
  expectedFrames, slideAnchors, scrubImages,
  counter, concurrency, onKeyframesReady, isMobile
) {
  // Phase 1: Load keyframe anchors first (critical for first render)
  const keyframePromises = slideAnchors.map(idx => loadSingleFrame(idx, scrubImages, counter));
  await Promise.all(keyframePromises);

  onKeyframesReady();

  // Phase 2: Build binary subdivision order for remaining frames
  const subdivisionOrder = buildSubdivisionOrder(expectedFrames, slideAnchors);

  // Phase 3: Load in batches following subdivision order
  for (let i = 0; i < subdivisionOrder.length;) {
    const batch = [];
    for (let j = 0; j < concurrency && i < subdivisionOrder.length; j++, i++) {
      if (!scrubImages[subdivisionOrder[i]]) {
        batch.push(loadSingleFrame(subdivisionOrder[i], scrubImages, counter));
      }
    }
    if (batch.length > 0) {
      await Promise.all(batch);
    }
  }

  console.log('[Scrubber] All ' + counter.loaded + ' frames cached' + (isMobile ? ' (mobile)' : ''));
  if (typeof window.onAllFramesCached === 'function') window.onAllFramesCached();
  window.dispatchEvent(new Event('bootComplete'));
}
