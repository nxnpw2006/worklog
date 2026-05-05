const firebaseConfig = {
  apiKey: "AIzaSyAEXdJVD5ZlWhQW3b9w2j7TcdF4hih555E",
  authDomain: "worklog-app-48d04.firebaseapp.com",
  projectId: "worklog-app-48d04",
  storageBucket: "worklog-app-48d04.firebasestorage.app",
  messagingSenderId: "1000954828407",
  appId: "1:1000954828407:web:05920537b8fa938718d872",
  measurementId: "G-JPY32WCRQY"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const dbStore = firebase.firestore();
