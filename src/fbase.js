// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4RubiI1k7n2ivGw0leIXxELKQy1aFfo0",
    authDomain: "ineed-eeb6c.firebaseapp.com",
    projectId: "ineed-eeb6c",
    storageBucket: "ineed-eeb6c.appspot.com",
    messagingSenderId: "524655598727",
    appId: "1:524655598727:web:a0253edc9e57ab44d96c22",
    measurementId: "G-TKNFG5D5KG"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {app, analytics};
