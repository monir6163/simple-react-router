// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4tU5f-iwt1wzKX3SBOj1vpeeUYh6uOpI",
    authDomain: "simple-firebase-authtication.firebaseapp.com",
    projectId: "simple-firebase-authtication",
    storageBucket: "simple-firebase-authtication.appspot.com",
    messagingSenderId: "439368496269",
    appId: "1:439368496269:web:e989b4a05e7c5c3c79dec4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
