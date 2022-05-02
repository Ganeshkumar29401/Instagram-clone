import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import firebase from 'firebase/compat';
const firebaseApp = initializeApp({
  apiKey: "AIzaSyCwSAkh1RJl1ltGMfQ5IbaOHtB1j21m7Vk",
  authDomain: "react-instagram-clone-aa673.firebaseapp.com",
  projectId: "react-instagram-clone-aa673",
  storageBucket: "react-instagram-clone-aa673.appspot.com",
  messagingSenderId: "608779167802",
  appId: "1:608779167802:web:57267a6ba36485dfc1ad03",
  measurementId: "G-M3SXY93YMH",
});

const db = getFirestore(firebaseApp);
const auth = getAuth();
const storage = getStorage(firebaseApp);
// const auth = firebase.auth();
// const storage = firebase.storage();

export { db, auth, storage };
