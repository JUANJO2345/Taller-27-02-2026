import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCtXdEDwoZlK-GpByloJotcYTGNazaAfbo",
  authDomain: "taller-27-02.firebaseapp.com",
  databaseURL: "https://taller-27-02-default-rtdb.firebaseio.com",
  projectId: "taller-27-02",
  storageBucket: "taller-27-02.firebasestorage.app",
  messagingSenderId: "154940169142",
  appId: "1:154940169142:web:379bfc1e81ca852e05bf17"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

