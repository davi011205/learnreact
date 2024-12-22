import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDzAg8KvPf8xZoko-tzzFQPd8xA2pbKLr4",
    authDomain: "tickets-30701.firebaseapp.com",
    projectId: "tickets-30701",
    storageBucket: "tickets-30701.firebasestorage.app",
    messagingSenderId: "6122582471",
    appId: "1:6122582471:web:4c3e11bdfd8545415a69e2",
    measurementId: "G-NBZQ49L144"
  };

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export { auth, db };