import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCy1tsQSZfnG8FB1wfRbWOpBexEQu4chUg",
    authDomain: "speakspace-9a3ee.firebaseapp.com",
    databaseURL: "https://speakspace-9a3ee-default-rtdb.firebaseio.com",
    projectId: "speakspace-9a3ee",
    storageBucket: "speakspace-9a3ee.firebasestorage.app",
    messagingSenderId: "221359219016",
    appId: "1:221359219016:web:6d03627d703baf9ebd537d",
    measurementId: "G-JP444HGR42"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()