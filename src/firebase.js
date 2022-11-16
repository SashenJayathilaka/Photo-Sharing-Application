import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCii7q81dFkBOh6QyG45Ld5gWXSePkgB6A",
  authDomain: "photo-sharing-86610.firebaseapp.com",
  projectId: "photo-sharing-86610",
  storageBucket: "photo-sharing-86610.appspot.com",
  messagingSenderId: "770585230819",
  appId: "1:770585230819:web:69cccf4ad3b32542bab4d6",
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);

// export
export { app, auth, firestore };
