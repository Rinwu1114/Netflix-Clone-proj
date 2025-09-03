
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBJLLoRbjnU4tdLESBeZYBUlYwxznlSUoo",
  authDomain: "netflix-clone-6dcd9.firebaseapp.com",
  projectId: "netflix-clone-6dcd9",
  storageBucket: "netflix-clone-6dcd9.firebasestorage.app",
  messagingSenderId: "934812975703",
  appId: "1:934812975703:web:9831f0bc5588d0fab45912",
  measurementId: "G-N1397CFCEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
    await addDoc(collection(database, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const login = async (email, password) => {
 try {
  await signInWithEmailAndPassword(auth, email, password);
 } catch (error) {
  console.log(error);
  toast.error(error.code.split('/')[1].split('-').join(" "))
 }
}

const logout = () => {
  signOut(auth)
}

export { auth, database, login, signup, logout}