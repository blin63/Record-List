var firebaseConfig = {
    apiKey: "AIzaSyDxJLTxRjVkrzOjI5LSdfyJWk2e3ufLZIY",
    authDomain: "record-list-e4aad.firebaseapp.com",
    projectId: "record-list-e4aad",
    storageBucket: "record-list-e4aad.appspot.com",
    messagingSenderId: "402963706388",
    appId: "1:402963706388:web:35dfd099b90fd58db9ad01"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Firestore Database
  var db = firebase.firestore();