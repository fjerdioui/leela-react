import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBjaQwwqpnDPw-pHbpGwbziuK4oN8n6ce0",
    authDomain: "leela-b1fe9.firebaseapp.com",
    projectId: "leela-b1fe9",
    storageBucket: "leela-b1fe9.appspot.com",
    messagingSenderId: "168571296582",
    appId: "1:168571296582:web:bb5c9dbb9e438caa682347",
    measurementId: "G-K1LF5DPLPJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
