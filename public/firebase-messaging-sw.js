// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  databaseURL: 'https://mare-bot.firebaseio.com',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
  apiKey: "AIzaSyBNgWb6gD6voZw41LqXIJovs99iT6OQI-Q",
  authDomain: "mare-bot.firebaseapp.com",
  projectId: "mare-bot",
  storageBucket: "mare-bot.appspot.com",
  messagingSenderId: "290369772303",
  appId: "1:290369772303:web:6af979c04e35560b21fc7a"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});