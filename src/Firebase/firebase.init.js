// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFTIwXop-N0lxFB-JjJTebSi9MTX_rn8Q",
  authDomain: "assignment10-3e0fa.firebaseapp.com",
  projectId: "assignment10-3e0fa",
  storageBucket: "assignment10-3e0fa.firebasestorage.app",
  messagingSenderId: "788675697839",
  appId: "1:788675697839:web:776c7c27b22b5c5b94885a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
