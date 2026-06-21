import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAgoS-njblH2wMK4ZItSpuWbG1a4pB9uNo",
  authDomain: "logintest01-5da50.firebaseapp.com",
  projectId: "logintest01-5da50",
  storageBucket: "logintest01-5da50.firebasestorage.app",
  messagingSenderId: "333591192774",
  appId: "1:333591192774:web:386d041ac5f389b890e3c7",
  measurementId: "G-FHJHWBTTG6"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);


// SESIÓN TEMPORAL
setPersistence(
  auth,
  browserSessionPersistence
);