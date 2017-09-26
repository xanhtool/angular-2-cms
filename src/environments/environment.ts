// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { FirebaseConfig } from './config';
export const environment = {
  production: false,
  firebase: {
    apiKey: FirebaseConfig.apiKey,
    authDomain: FirebaseConfig.authDomain,
    databaseURL: FirebaseConfig.databaseURL,
    projectId: FirebaseConfig.projectId,
    storageBucket: FirebaseConfig.storageBucket,
    messagingSenderId: FirebaseConfig.messagingSenderId
  }
};
