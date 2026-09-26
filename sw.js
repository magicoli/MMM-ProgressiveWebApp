/* Network-first, cache-on-success service worker. No hardcoded file list, so
 * it keeps working across MagicMirror² updates; it only smooths over brief
 * network drops, live module data still comes from the network.
 */
const CACHE_NAME = "mmm-progressive-web-app-v1";

self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    // Live connections and third-party requests go straight to the network.
    if (event.request.method !== "GET" || url.origin !== self.location.origin || url.pathname.includes("/socket.io/")) return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                const copy = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                return response;
            })
            .catch(() => caches.match(event.request)),
    );
});
