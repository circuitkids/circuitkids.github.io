var C="pack-test-v1",F=["./","index.html","pack-that-came-back.epub","vendor/epub.min.js","vendor/jszip.min.js"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}));self.skipWaiting()});
self.addEventListener("fetch",function(e){e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}))});
