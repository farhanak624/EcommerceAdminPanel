// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC0R4AZWK9klxUzGIakov-qG3ywBXRZgco",
  authDomain: "olympic-3c6e3.firebaseapp.com",
  projectId: "olympic-3c6e3",
  storageBucket: "olympic-3c6e3.appspot.com",
  messagingSenderId: "569536696047",
  appId: "1:569536696047:web:50871a16ef8f1046e5951a",
  measurementId: "G-ZE6KE6TW13",
});

const messaging = firebase.messaging();
