import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCy1tsQSZfnG8FB1wfRbWOpBexEQu4chUg",
  authDomain: "speakspace-9a3ee.firebaseapp.com",
  databaseURL: "https://speakspace-9a3ee-default-rtdb.firebaseio.com",
  projectId: "speakspace-9a3ee",
  storageBucket: "speakspace-9a3ee.appspot.com",
  messagingSenderId: "221359219016",
  appId: "1:221359219016:web:6d03627d703baf9ebd537d",
  measurementId: "G-JP444HGR42"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
import { getDatabase } from "firebase/database";
const rtdb = getDatabase(app);

export { auth, db, storage,rtdb, googleProvider };