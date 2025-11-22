const cacheName = "movie-rater-v3";

async function impl(e) {
    const url = new URL(e.request.url);
    if (
        url.pathname.includes("@vite") ||
        url.pathname.includes("@react-refresh") ||
        url.pathname.includes("node_modules") ||
        url.search.includes("t=") || // Időbélyeges kérések
        !url.protocol.startsWith("http") // Nem HTTP(S) kérések
    )
        return fetch(e.request); // Eredeti kérés továbbítása

    let cache = await caches.open(cacheName); // Cache megnyitása, async
    let cacheResponse = await cache.match(e.request); // Lookup
    if (cacheResponse) // Ha megvan
        return cacheResponse // Visszadjuk
    else {
        let networkResponse = await fetch(e.request); // Ha nincs meg, akkor elindítjuk a tényleges hálózati lekérdezést
        cache.put(e.request, networkResponse.clone()) // Eltároljuk
        return networkResponse; // Visszadjuk
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
                    console.log('Régi cache törlése:', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});