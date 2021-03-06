import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAUgQEbOBcqZdf_L0Sgm9DQyINiHuEqIVE',
  authDomain: 'coding-diary-d8ded.firebaseapp.com',
  databaseURL: 'https://coding-diary-d8ded.firebaseio.com',
  projectId: 'coding-diary-d8ded',
  storageBucket: 'coding-diary-d8ded.appspot.com',
  messagingSenderId: '309101571735',
  appId: '1:309101571735:web:1d74e9b8c9dd4e4e4f43d2',
};

function initializeFirebase() {
  // Prevent reinitializing the app in snack.
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  }
}
initializeFirebase();

export default firebaseConfig;
