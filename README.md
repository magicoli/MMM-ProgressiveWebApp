# MMM-ProgressiveWebApp

![Latest Release](https://img.shields.io/github/v/release/magicoli/MMM-ProgressiveWebApp?label=latest&include_prereleases)
![Stable](https://img.shields.io/github/v/release/magicoli/MMM-ProgressiveWebApp?label=stable&color=green)
![Node](https://img.shields.io/badge/node.js-22-blue)
[![License](https://img.shields.io/badge/license-AGPL--3.0-552b55)](LICENSE)
![GitHub commits since latest release](https://img.shields.io/github/commits-since/magicoli/MMM-ProgressiveWebApp/latest)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/magicoli/MMM-ProgressiveWebApp/total)

Set your [MagicMirror²](https://magicmirror.builders) as a fullscreen app on a tablet or phone, and keep the screen awake.

Handy to turn a spare tablet into a wall display or a bedside clock.

## Features

- Installable app (Add to Home Screen), with its own name, colors and icons
- Fullscreen display
- Screen kept awake while MagicMirror² is shown
- Service worker smoothing over brief network drops
- No visible output, works with any layout

## Requirements

- MagicMirror² (tested with 2.37)
- HTTPS: installing the app, the service worker and keeping the screen awake all need a secure context. Serve MagicMirror² behind a reverse proxy with a certificate (`localhost` works for testing).
- MagicMirror² reachable by the tablet, e.g. `address: "0.0.0.0"` and `ipWhitelist: []` in `config/config.js` when access is controlled by the reverse proxy

## Installation

See [MagicMirror² installation guide](https://docs.magicmirror.builders/getting-started/installation.html) to setup your MagicMirror² first.

```bash
# Adjust to your actual MagicMirror² installation path
cd MagicMirror/modules
git clone https://github.com/magicoli/MMM-ProgressiveWebApp.git
```

No dependencies to install. To update, run `git pull` in `modules/MMM-ProgressiveWebApp`.

## Configuration

Add the module to `config/config.js`. It needs no position.

```js
{
    module: "MMM-ProgressiveWebApp",
    config: {
        name: "Bedside Clock",
        themeColor: "#0b0b10",
    },
},
```

| Option            | Default           | Description                                                                                                                                                                                             |
| ----------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`            | `"MagicMirror²"`  | App name, also used as page title                                                                                                                                                                       |
| `shortName`       | same as `name`    | Name under the home screen icon                                                                                                                                                                         |
| `themeColor`      | `"#000000"`       | Color of the browser and system bars                                                                                                                                                                    |
| `backgroundColor` | `"#000000"`       | Splash screen color while the app starts                                                                                                                                                                |
| `orientation`     | `"any"`           | Screen orientation: `"any"`, `"landscape"`, `"portrait"`...                                                                                                                                             |
| `icons`           | MagicMirror² logo | [Manifest icons](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/icons), paths relative to the MagicMirror² folder. The first one is also the iOS home screen icon |
| `wakeLock`        | `true`            | Keep the screen awake                                                                                                                                                                                   |
| `fullscreen`      | `true`            | Request fullscreen, also on the first tap if the browser refused it at start                                                                                                                            |

Custom icons can go in MagicMirror²'s `config/` folder, which it serves as is:

```js
icons: [
    { src: "config/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "config/icon-512.png", sizes: "512x512", type: "image/png" },
],
```

Restart MagicMirror² after changing the module config.

## Tablet setup

Open MagicMirror² in the tablet's browser, then install it:

- **Android**: Chrome menu, _Add to Home screen_. Prefer Chrome, other browsers may ignore the app name.
- **iPad / iPhone**: Safari _Share_ menu, _Add to Home Screen_.

Launch it from the home screen icon. Tap the screen once if fullscreen doesn't kick in.

An installed app doesn't always pick up a new name or icon: remove it and add it again.

## License

[AGPL-3.0-or-later](LICENSE)
