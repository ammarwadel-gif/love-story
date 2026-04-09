import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBcGJvgrlde4hswzEGuduR-1Q8fV4uL7kc",
  authDomain: "love-experience-8d99e.firebaseapp.com",
  projectId: "love-experience-8d99e",
  storageBucket: "love-experience-8d99e.firebasestorage.app",
  messagingSenderId: "657911053366",
  appId: "1:657911053366:web:8a7ee20d60ef82ce0c2c97",
  measurementId: "G-0GY20SFW6N"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const storage = getStorage(app);