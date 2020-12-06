// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
  apiKey: "AIzaSyANDIBqXwc5TviWgtI7o0U5ZVqvkIWM_mM",
  authDomain: "se3316-lab5-khan67.firebaseapp.com",
  databaseURL: "https://se3316-lab5-khan67-default-rtdb.firebaseio.com",
  projectId: "se3316-lab5-khan67",
  storageBucket: "se3316-lab5-khan67.appspot.com",
  messagingSenderId: "573786578079",
  appId: "1:573786578079:web:00a35f21e907a20284d6aa",
  measurementId: "G-XSSGZW0TZ4"
  }
};

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyANDIBqXwc5TviWgtI7o0U5ZVqvkIWM_mM",
    authDomain: "se3316-lab5-khan67.firebaseapp.com",
    databaseURL: "https://se3316-lab5-khan67-default-rtdb.firebaseio.com",
    projectId: "se3316-lab5-khan67",
    storageBucket: "se3316-lab5-khan67.appspot.com",
    messagingSenderId: "573786578079",
    appId: "1:573786578079:web:00a35f21e907a20284d6aa",
    measurementId: "G-XSSGZW0TZ4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
