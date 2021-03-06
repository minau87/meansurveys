// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Defines environment attributes such as the available API Endpoints

const apiBaseUrl = 'http://localhost:3000/api';
const authUrl = 'http://localhost:3000/auth';

export const environment = {
  production: false,
  endpoints: {
    surveys: {
      post: apiBaseUrl + '/surveys',
      get: apiBaseUrl + '/surveys',
      getOne: apiBaseUrl + '/surveys/',
      update: apiBaseUrl + '/surveys/',
      delete: apiBaseUrl + '/surveys/'
    },
    users: {
      post: apiBaseUrl + '/users',
      get: apiBaseUrl + '/users',
      getOne: apiBaseUrl + '/users/',
      put: apiBaseUrl + '/users/',
      delete: apiBaseUrl + '/users/'
    },
    authentication: {
      post: authUrl
    },
    profile: {
      get: apiBaseUrl + '/users/profile'
    }
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
