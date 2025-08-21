
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDgt6AUaEstGi0lWxW6lNlvUUFPxrMZbcc",
  authDomain: "netflix-clone-d53da.firebaseapp.com",
  projectId: "netflix-clone-d53da",
  storageBucket: "netflix-clone-d53da.firebasestorage.app",
  messagingSenderId: "25638429707",
  appId: "1:25638429707:web:03524c8970f740216e130e"
};

// Initialize Firebase
export const firebase= initializeApp(firebaseConfig);


