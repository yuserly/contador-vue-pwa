const CACHE_NAME = "v1_cache_contador";
const urlsToCache = [
  "./",
  "./img/icon16.png",
  "./img/icon32.png",
  "./img/icon64.png",
  "./img/icon128.png",
  "./img/icon256.png",
  "./img/icon512.png",
  "./img/icon1024.png",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js",
  "https://unpkg.com/vue@next",
  "./js/main.js",
  "./js/mount.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        cache
          .addAll(urlsToCache)
          .then(() => self.skipWaiting())
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err))
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhiteList = [CACHE_NAME];
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhiteList.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            } 
          })
        );
      })
      .then(
          () => self.clients.claim()
        )
  )
})

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if(res){
                    return res
                }

                return fetch(e.request)
                
            }
            
        )
    )
});
