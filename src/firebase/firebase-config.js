import firebase from 'firebase/app';
import 'firebase/firestore';
import  'firebase/auth';

let firebaseConfig = {};

if (process.env.NODE_ENV === 'test') {
  firebaseConfig = {
    apiKey: "AIzaSyD5cQ84gDZlQKXYq1_jNpRNv5RKzeMrIGY",
    authDomain: "testing-dd6df.firebaseapp.com",
    projectId: "testing-dd6df",
    storageBucket: "testing-dd6df.appspot.com",
    messagingSenderId: "592492821533",
    appId: "1:592492821533:web:62fd0238a9f25e6946daf4"
  };
} else { // Dev & Prod
  firebaseConfig = {
    apiKey: "AIzaSyDREDOeYFZuRn_05BjDwuBzBbED_WFNGEA",
    authDomain: "react-app-73d3f.firebaseapp.com",
    projectId: "react-app-73d3f",
    storageBucket: "react-app-73d3f.appspot.com",
    messagingSenderId: "626268814484",
    appId: "1:626268814484:web:7321b787c5b9f63ca8c881"
  };
}


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}