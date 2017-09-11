## SETUP
STEP 1: go to src/enviroments and edit this config by this instruction [firebase setup](https://firebase.google.com/docs/web/setup):
    `export const environment = {
    production: true,
    firebase: {
        apiKey: "xxx",
        authDomain: "xxx",
        databaseURL: "xxx",
        projectId: "xxx",
        storageBucket: "xxx",
        messagingSenderId: "xxx"
    }
    };`

STEP 2: run `yarn` or `npm install`

STEP 3: go to /functions and run: `yarn` or `npm install`

USING: goto [website](https://apt-port-161714.firebaseapp.com/) or [login](https://apt-port-161714.firebaseapp.com/login) to login to dashboard

# Website

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
