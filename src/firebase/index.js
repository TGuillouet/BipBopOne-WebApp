import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCMlrIrTbCIIoi6JYaFDUtSAhlviGW3_i0",
  authDomain: "bipbopone.firebaseapp.com",
  databaseURL: "https://bipbopone.firebaseio.com",
  projectId: "bipbopone",
  storageBucket: "bipbopone.appspot.com",
  messagingSenderId: "195975559874",
  appId: "1:195975559874:web:ad3b60fdbc060f2ba2995b",
  measurementId: "G-CPYT7VBBDD"
};
firebase.initializeApp(config);

const storage = firebase.storage(); // fichier
const firestore = firebase.firestore(); // data base
const auth = firebase.auth(); // data base

export {
    storage, firestore, auth, firebase as default
}
