// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVcgl4inQtHOFfyDAQHC7rq6OB_6yeTYc",
  authDomain: "fir-auth-b6da7.firebaseapp.com",
  projectId: "fir-auth-b6da7",
  storageBucket: "gs://fir-auth-b6da7.appspot.com/",
  messagingSenderId: "1030696273670",
  appId: "1:1030696273670:web:2be3176c3e242de2140087",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const markersCollectionRef = collection(db, "markersCoords");
const usersCollectionRef = collection(db, "users");

export { auth, db, storage, markersCollectionRef, usersCollectionRef };
