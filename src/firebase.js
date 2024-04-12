// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDif6rfb7Chl4aANyR6BVQXCXcvIK9OFmg",
  authDomain: "uuuuu-bbd69.firebaseapp.com",
  databaseURL: "https://uuuuu-bbd69-default-rtdb.firebaseio.com",
  projectId: "uuuuu-bbd69",
  storageBucket: "uuuuu-bbd69.appspot.com",
  messagingSenderId: "889546164313",
  appId: "1:889546164313:web:25afb64be2b25252100948",
  measurementId: "G-D7RZQMM2GR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const storage = getStorage(app);
