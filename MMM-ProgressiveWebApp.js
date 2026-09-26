/* MagicMirror² module: MMM-ProgressiveWebApp
 * Makes MagicMirror² installable as a fullscreen home screen app and keeps
 * the screen awake. The app metadata (name, colors, icons) is served by the
 * node helper as a web app manifest.
 */
Module.register("MMM-ProgressiveWebApp", {
    defaults: {
        wakeLock: true,
        fullscreen: true,
    },

    start() {
        this.injectHead();
        this.registerServiceWorker();

        if (this.config.wakeLock) {
            this.requestWakeLock();
            // The browser releases the lock whenever the page is hidden.
            document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "visible")
                    this.requestWakeLock();
            });
        }

        if (this.config.fullscreen) {
            this.requestFullscreen();
            // Browsers often require a user gesture: retry on the first tap.
            document.addEventListener("click", () => this.requestFullscreen(), {
                once: true,
            });
        }
    },

    /**
     * Links the manifest and adds the tags Safari still relies on, from the
     * manifest values (MagicMirror² already sets apple-mobile-web-app-capable).
     */
    async injectHead() {
        const manifestUrl = new URL(
            `${this.name}/manifest.webmanifest`,
            document.baseURI,
        );
        this.addHeadTag("link", { rel: "manifest", href: manifestUrl.href });

        try {
            const manifest = await (await fetch(manifestUrl)).json();
            document.title = manifest.name;
            this.addHeadTag("meta", {
                name: "theme-color",
                content: manifest.theme_color,
            });
            this.addHeadTag("meta", {
                name: "apple-mobile-web-app-title",
                content: manifest.short_name,
            });
            this.addHeadTag("link", {
                rel: "apple-touch-icon",
                href: new URL(manifest.icons[0].src, manifestUrl).href,
            });
        } catch (error) {
            Log.error(`${this.name}: could not load the manifest`, error);
        }
    },

    addHeadTag(tag, attributes) {
        document.head.appendChild(
            Object.assign(document.createElement(tag), attributes),
        );
    },

    registerServiceWorker() {
        if (!("serviceWorker" in navigator)) return;
        navigator.serviceWorker
            .register(`${this.name}/sw.js`, { scope: "./" })
            .catch((error) => {
                Log.error(
                    `${this.name}: service worker registration failed`,
                    error,
                );
            });
    },

    requestWakeLock() {
        // A hidden page can't hold the lock: visibilitychange requests it later.
        if (!("wakeLock" in navigator) || document.hidden) return;
        navigator.wakeLock.request("screen").catch((error) => {
            Log.error(`${this.name}: wake lock request failed`, error);
        });
    },

    requestFullscreen() {
        if (
            document.fullscreenElement ||
            !document.documentElement.requestFullscreen
        )
            return;
        // Failures are expected without a user gesture, the click listener retries.
        document.documentElement.requestFullscreen().catch(() => {});
    },
});
