import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAOSwXmEh0_Jo5446LVYHDV-N1gpTje4dw",
  authDomain: "aura-app-6c5a5.firebaseapp.com",
  projectId: "aura-app-6c5a5",
  storageBucket: "aura-app-6c5a5.firebasestorage.app",
  messagingSenderId: "24075039114",
  appId: "1:24075039114:web:2fe9a3184295bb83ded873",
  measurementId: "G-R01NZQM91B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
