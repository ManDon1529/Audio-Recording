// Import the functions you need from the SDKs you need
import  {initializeApp} from "firebase/app"
import {getAuth} from 'firebase/auth'
import{getFirestore} from '@firebase/firestore'
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyn3ljm8KP4E3TqBo-c7RIX4SJF_lKQOw",
  authDomain: "recordings2-40de2.firebaseapp.com",
  projectId: "recordings2-40de2",
  storageBucket: "recordings2-40de2.appspot.com",
  messagingSenderId: "790295723546",
  appId: "1:790295723546:web:cf0cabed9ddebaa4fb5ba3",
  measurementId: "G-6P0FVH21J6"
};

// Initialize Firebase
const app= initializeApp(firebaseConfig);
const db= getFirestore(app)
const auth=getAuth(app);
export {auth ,db};