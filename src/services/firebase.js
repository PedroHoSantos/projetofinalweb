import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkKxzg4fQLgfOmvqwX3EAGEaJjmJXH2Sk",
  authDomain: "projetofinalweb-77a3d.firebaseapp.com",
  projectId: "projetofinalweb-77a3d",
  storageBucket: "projetofinalweb-77a3d.firebasestorage.app",
  messagingSenderId: "864067244532",
  appId: "1:864067244532:web:bbab589ae553de10a8a9a1",
  measurementId: "G-RFKF3ZE40D"
}

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Exporta serviços
export const db = getFirestore(app);
export const auth = getAuth(app);