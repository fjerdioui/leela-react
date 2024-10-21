import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./fire-base-db/leela-b1fe9-firebase-adminsdk-6pdtm-3f1da12c6b.json"; // Adjust path as necessary

initializeApp({
  credential: cert(serviceAccount as any), // Correct the type here
});

const db = getFirestore();

export { db };

// const firebaseConfig = {
//     apiKey: "AIzaSyBjaQwwqpnDPw-pHbpGwbziuK4oN8n6ce0",
//     authDomain: "leela-b1fe9.firebaseapp.com",
//     projectId: "leela-b1fe9",
//     storageBucket: "leela-b1fe9.appspot.com",
//     messagingSenderId: "168571296582",
//     appId: "1:168571296582:web:bb5c9dbb9e438caa682347",
//     measurementId: "G-K1LF5DPLPJ"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// export { db };
