// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgpQTW5gCwjhTE0-P6pS0yhrfyEhRFiLk",
  authDomain: "tu-chambita-2237e.firebaseapp.com",
  projectId: "tu-chambita-2237e",
  storageBucket: "tu-chambita-2237e.firebasestorage.app",
  messagingSenderId: "14748974587",
  appId: "1:14748974587:web:e74bce2aa91af070ec5f5e",
  measurementId: "G-ZRFJ74L7MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth,db,analytics,app };
