import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { 
  persistentLocalCache, 
  persistentMultipleTabManager, 
  initializeFirestore 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB26Nf_4NfwDU9RlESfs_9cIUHSZxyxEvk",
  authDomain: "notes-firebase-49e5d.firebaseapp.com",
  projectId: "notes-firebase-49e5d",
  storageBucket: "notes-firebase-49e5d.firebasestorage.app",
  messagingSenderId: "537705406071",
  appId: "1:537705406071:web:3b12f831452289267ff072",
  measurementId: "G-SJSGPY7481"
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { signInWithPopup, signOut };
