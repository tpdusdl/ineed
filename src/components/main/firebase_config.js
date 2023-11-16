// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
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
const auth = getAuth(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ promp: 'select_account' });
const signInWithGoogle = () => signInWithPopup(auth, provider);

export { auth, firestore, signInWithGoogle, app as default };



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from 'firebase'
// const firebaseConfig = {
//   apiKey: "AIzaSyC4RubiI1k7n2ivGw0leIXxELKQy1aFfo0",
//   authDomain: "ineed-eeb6c.firebaseapp.com",
//   projectId: "ineed-eeb6c",
//   storageBucket: "ineed-eeb6c.appspot.com",
//   messagingSenderId: "524655598727",
//   appId: "1:524655598727:web:a0253edc9e57ab44d96c22",
//   measurementId: "G-TKNFG5D5KG"
// };
// firebase.initializeApp(firebaseConfig)
// // Initialize Firebase

// export const auth=firebase.auth();
// export const firestore=firebase.firestore();
// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({promp:'select_account'});
// export const signInWithGoogle=()=>auth.signInWithGoogle(provider);
// export default firebase;
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

