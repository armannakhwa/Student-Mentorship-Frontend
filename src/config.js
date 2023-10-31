// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBuRGYH7hX-_xQ0TBd6AZpa0DN1rMeZEYA",
  authDomain: "todo-27a31.firebaseapp.com",
  projectId: "todo-27a31",
  storageBucket: "todo-27a31.appspot.com",
  messagingSenderId: "721528718462",
  appId: "1:721528718462:web:e5f5a8ea005d84e2d9842f",
  measurementId: "G-GJJV4KDHLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider();
export {auth,provider};