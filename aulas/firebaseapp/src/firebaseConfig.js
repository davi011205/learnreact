import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAG8vB5s5KwzU3IZWIWm070WkoyuIBcxLE",
    authDomain: "curso-82591.firebaseapp.com",
    projectId: "curso-82591",
    storageBucket: "curso-82591.firebasestorage.app",
    messagingSenderId: "998559419399",
    appId: "1:998559419399:web:0199c406d46ea5f50baea2",
    measurementId: "G-HYEW89957N"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db, auth};

  