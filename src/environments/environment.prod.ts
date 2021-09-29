export const environment = {
  production: true,
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
