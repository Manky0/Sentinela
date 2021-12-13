// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "GOOGLE_API_KEY",
  authDomain: "PROJECT_DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_BUCKET",
  messagingSenderId: "ID",
  appId: "APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const markersCollectionRef = collection(db, "markersCoords");
const usersCollectionRef = collection(db, "users");

export { auth, db, storage, markersCollectionRef, usersCollectionRef };
