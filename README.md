# Google Chrome reader extension

The extension is under development and will soon be available on Chrome store.

## Running extension in development mode

Enable developer mode in Google Chrome and click on 'Load unpacked' and select the extensions folder of the repo. You can now use the extension on any website.

![Chrome extensions tab](./screenshot1.png)

## Development environment setup

Run `npm install` to start the development server. The source code is in src folder and is powered by React.

### Updating the extension
Run `npm run build` to generate the production code and do the following steps:
1. Replace `extension/main.css` with `build/main.css`.
2. Replace `extension/main.js` with `build/static/js/main.[hash].js` after renaming it to `main.js`.
3. Refresh the extension.
