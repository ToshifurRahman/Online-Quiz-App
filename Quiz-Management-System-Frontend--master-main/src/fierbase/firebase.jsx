/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATlCC4Y6lkWDJy51kcmc1HMt6bEL5BeyE",
    authDomain: "quiz-app-2673e.firebaseapp.com",
    projectId: "quiz-app-2673e",
    storageBucket: "quiz-app-2673e.appspot.com",
    messagingSenderId: "609545850115",
    appId: "1:609545850115:web:a0f9fb5a550b9aa5d42d36"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app)
export default firebaseConfig