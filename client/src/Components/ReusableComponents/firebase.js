


import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // ... your config details
  apiKey: "AIzaSyDfYQbVa3VnKT7CNDV4e_lXcQQjVDWbin0",
  authDomain: "hireon-f5a77.firebaseapp.com",
  projectId: "hireon-f5a77",
  storageBucket: "hireon-f5a77.appspot.com",
  messagingSenderId: "381841586141",
  appId: "1:381841586141:web:d2d2c48835709c025e6834",
  measurementId: "G-9Q87BWYTE1",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
