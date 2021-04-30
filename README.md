# Contatos Mobile App

Frontend Ionic Angular application.

Development environment requirements
------------------------------------
* [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
* [NodeJs](https://docs.docker.com/engine/install/)
* [Android Studio](https://developer.android.com/studio/)

Suggestion: Install NodeJS using Node Version Manger
---------------------------------------------------
Please, install and use the NodeJS version 16.0.0, for avoiding compatibility issues:
```
nvm install 16.0.0
nvm use 16.0.0
```
Obs: Running the above commands, the npm v7.10.0 (package manager) will be automatically installed.

Install requirements
--------------------
**Ionic CLI**
- This project made with Ionic, so, for development purposes, you need to install the Ionic command line interface:
```
npm i -g @ionic/cli
```

How to start
------------
Please, make sure:
- you installed **NodeJS 16.0.0**.
- you have **Android Studio** installed at `/usr/local/android-studio/bin/studio.sh` or a symlink there that targets to your Android Studio directory.
For running with live reload feature (development environment) (web browser):
```
npm start
```
For running in android device with live reload (development environment) (android not native):
```
npm run android
```
For building android project (development environment) (android native):
```
npm run build-android
```
For building android project (production environment) (android native):
```
npm run build-android-prod
```

Obs: Checkout `package.json` for more command aliases, like test and lint.