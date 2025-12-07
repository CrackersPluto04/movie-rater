const cacheName = "movie-rater-v2";

async function impl(e) {
    const url = new URL(e.request.url);
    if (
        url.pathname.includes("@vite") ||
        url.pathname.includes("@react-refresh") ||
        url.pathname.includes("node_modules") ||
        url.search.includes("t=") ||
        !url.protocol.startsWith("http")
    )
        return fetch(e.request); // Original request return

    let cache = await caches.open(cacheName); // Cache open, async
    let cacheResponse = await cache.match(e.request); // Lookup
    if (cacheResponse) // if found
        return cacheResponse // return
    else {
        let networkResponse = await fetch(e.request); // else, start the real network query
        cache.put(e.request, networkResponse.clone()) // store
        return networkResponse; // return
    }
}

self.addEventListener("fetch", e => e.respondWith(impl(e)));

self.addEventListener("install", e => {
    self.skipWaiting();
});

self.addEventListener("activate", e => {
    e.waitUntil(clients.claim());

    e.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                // Delete old cache versions
                if (key !== cacheName) {
                    console.log('Deleting old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

// Push notification implementation
self.addEventListener("push", e => {
    const data = e.data?.text();
    const options = {
        body: data
    };
    e.waitUntil(
        self.registration.showNotification('Movie Rater Notification', options)
    );
});