# Builds
All builds are made in this folder using [Electron Packager](https://github.com/electron-userland/electron-packager).

In order to create a build you'll need to install this with `npm install electron-packager -g`. After that, run `npm run dist` to generate a release for every supported platform your host is capable of building. If you want a Windows 64 bit specific build use `npm run dist_windows`.
