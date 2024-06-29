// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbzZfCuMPPkaB3Xoy8wDDmIQIvoQT52DU",
  authDomain: "total-64615.firebaseapp.com",
  projectId: "total-64615",
  storageBucket: "total-64615.appspot.com",
  messagingSenderId: "145691039939",
  appId: "1:145691039939:web:a60afc5e7ec6d541e96a76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
