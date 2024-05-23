import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc, getDocs, doc, updateDoc,deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRk4nCDMT4qUCfYencRUzj8i82VlfodTw",
  authDomain: "loja-firebase-6cd4e.firebaseapp.com",
  projectId: "loja-firebase-6cd4e",
  storageBucket: "loja-firebase-6cd4e.appspot.com",
  messagingSenderId: "1076262902338",
  appId: "1:1076262902338:web:fbcc30e874eebc3538abdb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{app,db,getFirestore,collection, addDoc, getDocs, doc, updateDoc,deleteDoc}