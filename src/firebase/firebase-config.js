import firebase from 'firebase/app';
import 'firebase/firestore';
import  'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDREDOeYFZuRn_05BjDwuBzBbED_WFNGEA",
  authDomain: "react-app-73d3f.firebaseapp.com",
  projectId: "react-app-73d3f",
  storageBucket: "react-app-73d3f.appspot.com",
  messagingSenderId: "626268814484",
  appId: "1:626268814484:web:7321b787c5b9f63ca8c881"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}