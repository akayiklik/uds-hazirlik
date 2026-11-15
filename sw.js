// Çevrimdışı çalışma: dosyalar ilk açılışta önbelleğe alınır.
// İçerik güncellenince SURUM değeri artırılır; eski önbellek silinir.
var SURUM = 'uds-site-v1';
var DOSYALAR = ["./", "index.html", "sorular.js", "kitap.js", "fonts.css", "manifest.webmanifest", "ikon-192.png", "ikon-512.png", "ikon-180.png", "atkinson-hyperlegible-latin-400-normal.woff2", "atkinson-hyperlegible-latin-700-normal.woff2", "atkinson-hyperlegible-latin-ext-400-normal.woff2", "atkinson-hyperlegible-latin-ext-700-normal.woff2", "bricolage-grotesque-latin-500-normal.woff2", "bricolage-grotesque-latin-700-normal.woff2", "bricolage-grotesque-latin-ext-500-normal.woff2", "bricolage-grotesque-latin-ext-700-normal.woff2"];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(SURUM).then(function (c) { return c.addAll(DOSYALAR); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (l) {
    return Promise.all(l.filter(function (k) { return k !== SURUM; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(function (r) {
    return r || fetch(e.request);
  }));
});
