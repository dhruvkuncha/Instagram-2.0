// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore} from "@firebase/firestore";
import {getStorage} from 'firebase/storage'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE4ScWJk2Tm1Jn7ZUI6bNQUjLy-i-2aQY",
  authDomain: "instagram-clone-8be11.firebaseapp.com",
  projectId: "instagram-clone-8be11",
  storageBucket: "instagram-clone-8be11.appspot.com",
  messagingSenderId: "145013495525",
  appId: "1:145013495525:web:f9a5755e8ce4843685e60c"
};


// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();

const storage = getStorage();

export { app, db, storage };
