import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // FIREBASE CONFIG HERE
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);
