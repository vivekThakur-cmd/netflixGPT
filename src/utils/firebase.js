// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDD7RYH0ETbXl0SFo6Vbkc7epvdrhhGSDo",
    authDomain: "netflixgpt-90d4c.firebaseapp.com",
    projectId: "netflixgpt-90d4c",
    storageBucket: "netflixgpt-90d4c.firebasestorage.app",
    messagingSenderId: "69179609197",
    appId: "1:69179609197:web:a024614228ffa284072f64",
    measurementId: "G-72S5B7C5ZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
