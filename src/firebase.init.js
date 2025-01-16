// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey || "MISSING_API_KEY",
    authDomain: import.meta.env.VITE_authDomain || "MISSING_AUTH_DOMAIN",
    projectId: import.meta.env.VITE_projectId || "MISSING_PROJECT_ID",
    storageBucket: import.meta.env.VITE_storageBucket || "MISSING_STORAGE_BUCKET",
    messagingSenderId: import.meta.env.VITE_messagingSenderId || "MISSING_MESSAGING_SENDER_ID",
    appId: import.meta.env.VITE_appId || "MISSING_APP_ID",
};

// Log configuration to check values (use only during debugging)
console.log("Firebase Config:", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
