// Modular Firebase v.9 Initialization.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "@firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyD4bmoXTtp3rtRxo7ijV7l1_uy_kHGZWSI",
    authDomain: "rudra-image-host.firebaseapp.com",
    databaseURL: "https://rudra-image-host-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "rudra-image-host",
    storageBucket: "rudra-image-host.appspot.com",
    messagingSenderId: "226232857917",
    appId: "1:226232857917:web:18cd1e74577d8cf7d38154"
};



function initFirebase() {
    if (typeof window !== undefined) {
        initializeApp(firebaseConfig);
        console.log("Firebase has been init successfully");
    }
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const realDB = getDatabase(app);

export { initFirebase, db, realDB };