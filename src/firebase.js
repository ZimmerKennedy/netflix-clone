import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2CwWxRgTuJ9mAd14H_VvEG_Tf_1_A2-8",
  authDomain: "web-app-clone-netflix.firebaseapp.com",
  projectId: "web-app-clone-netflix",
  storageBucket: "web-app-clone-netflix.appspot.com",
  messagingSenderId: "732524391441",
  appId: "1:732524391441:web:54bd8c299d6f75531c15b0",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth, db };