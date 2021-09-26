// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCCtejiJvqg3n0Xf76CDhJQ7lCoOLz1iY0',
    authDomain: 'ingresapp-jg.firebaseapp.com',
    databaseURL: 'https://ingresapp-jg.firebaseio.com',
    projectId: 'ingresapp-jg',
    storageBucket: 'ingresapp-jg.appspot.com',
    messagingSenderId: '327251504047',
    appId: '1:327251504047:web:7946057a40aee3412f9d5a',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ReExSpaces: new RegExp(/[a-zA-Z ]*[^\s]+/),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ReExMail: new RegExp(
    // tslint:disable-next-line: max-line-length
    // eslint-disable-next-line max-len 
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ReExInteger: new RegExp(/^(0|[1-9]\d*)?/),
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
