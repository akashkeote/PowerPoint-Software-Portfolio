export const CACHE_NAME = 'ppt-scrub-frames-v1';

export async function fetchWithCache(url) {
  if ('caches' in window) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(url);
    if (cachedResponse) {
      return await cachedResponse.blob();
    }
    
    const networkResponse = await fetch(url);
    const clonedResponse = networkResponse.clone();
    cache.put(url, clonedResponse);
    return await networkResponse.blob();
  } else {
    const res = await fetch(url, { cache: 'force-cache' });
    return await res.blob();
  }
}
