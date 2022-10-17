// Modular Firebase v.9 Initialization.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "@firebase/database";

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const firebaseConfig = {
    apiKey: "AIzaSyCEcRxocWuK_qLfvnn-W7u6h0hZPW18QT8",
    authDomain: "rudra-cycle-mart.firebaseapp.com",
    databaseURL: "https://rudra-cycle-mart-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "rudra-cycle-mart",
    storageBucket: "rudra-cycle-mart.appspot.com",
    messagingSenderId: "776207299074",
    appId: "1:776207299074:web:3e5a0dec9d305b6d5bad1b"
};



function initFirebase() {
    if (typeof window !== undefined) {
        initializeApp(clientCredentials);
        console.log("Firebase has been init successfully");
    }
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const realDB = getDatabase(app);

export { initFirebase, db, realDB };