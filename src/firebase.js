
import { getStorage } from "firebase/storage";
import "firebase/auth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
require('firebase/auth')

const firebaseConfig = {
    apiKey: "AIzaSyC1zrLOheo8gk1ExljoCwD2TjwWRYkC7Q4",
    authDomain: "moviesanime-3f59e.firebaseapp.com",
    projectId: "moviesanime-3f59e",
    storageBucket: "moviesanime-3f59e.appspot.com",
    messagingSenderId: "63403317692",
    appId: "1:63403317692:web:2142255abc919df0cef3b9"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
  const storage=getStorage(firebaseApp);

  export {auth,provider,storage};
  export default db;

