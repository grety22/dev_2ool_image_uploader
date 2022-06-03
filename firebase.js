// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL6S9VKjOfgs__N53pMicd9CLWVTGoBk4",
  authDomain: "dev-2ool.firebaseapp.com",
  projectId: "dev-2ool",
  storageBucket: "dev-2ool.appspot.com",
  messagingSenderId: "933809800021",
  appId: "1:933809800021:web:f37fea835f9029b77265dc"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// DB
const db = getFirestore();
const storage = getStorage();

export { app, db, storage }
