/* MagicMirror² module: MMM-ProgressiveWebApp
 * Serves the web app manifest, built from the module config, and the service
 * worker, allowed to control the whole MagicMirror² page.
 */
const path = require("node:path");
const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
    defaults: {
        name: "MagicMirror²",
        shortName: null,
        themeColor: "#000000",
        backgroundColor: "#000000",
        orientation: "any",
        icons: [
            {
                src: "modules/MMM-ProgressiveWebApp/icons/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "modules/MMM-ProgressiveWebApp/icons/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    },

    start() {
        const moduleConfig = global.config.modules.find(
            (module) => module.module === this.name,
        )?.config;
        const manifest = this.buildManifest({
            ...this.defaults,
            ...moduleConfig,
        });

        this.expressApp.get(
            `/${this.name}/manifest.webmanifest`,
            (req, res) => {
                res.type("application/manifest+json").json(manifest);
            },
        );

        // Served from the module path, a service worker would only control
        // that path: the header extends its scope to the whole page.
        this.expressApp.get(`/${this.name}/sw.js`, (req, res) => {
            res.set("Service-Worker-Allowed", global.config.basePath ?? "/");
            res.sendFile(path.join(this.path, "sw.js"));
        });
    },

    /**
     * Builds the manifest. URLs are relative to the manifest, so "../" is the
     * MagicMirror² root, whatever its basePath.
     */
    buildManifest(config) {
        return {
            name: config.name,
            short_name: config.shortName ?? config.name,
            start_url: "../",
            scope: "../",
            display: "fullscreen",
            orientation: config.orientation,
            background_color: config.backgroundColor,
            theme_color: config.themeColor,
            // Relative icon paths are relative to the MagicMirror² root.
            icons: config.icons.map((icon) => ({
                ...icon,
                src: /^([a-z]+:|\/)/i.test(icon.src)
                    ? icon.src
                    : `../${icon.src}`,
            })),
        };
    },
});
