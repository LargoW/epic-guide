const C = 'epic-guide-v4';
self.addEventListener('install', e => e.waitUntil(caches.open(C).then(c => c.addAll(['index.html', 'ref.js', 'manifest.json']))));
self.addEventListener('fetch', e => e.respondWith(
  fetch(e.request).then(r => { const copy = r.clone(); caches.open(C).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request))
));
