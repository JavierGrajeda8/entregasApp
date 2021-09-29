// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDhQrQCy1mjJaCYHBSWM1eqo0ivry4slow',
    authDomain: 'entregasapp-d3883.firebaseapp.com',
    projectId: 'entregasapp-d3883',
    storageBucket: 'entregasapp-d3883.appspot.com',
    messagingSenderId: '344985409523',
    appId: '1:344985409523:web:c12b24a6609e09875fe486',
    measurementId: 'G-HRWGRT8ZZC',
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
