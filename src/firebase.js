import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore
} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyDto-Jie58vAESQObsggExSjtM4uDn5BaA",
    authDomain: "neflix-clone-8f4ad.firebaseapp.com",
    projectId: "neflix-clone-8f4ad",
    storageBucket: "neflix-clone-8f4ad.firebasestorage.app",
    messagingSenderId: "428714687340",
    appId: "1:428714687340:web:7662e004234fe58fe75149"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
        toast.success('Login Successful!');

    } catch (error) {
        console.log("Sign up error", error);
        toast.error(error.code.split('/')[1].split('-').join(' ').toUpperCase())

    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Login Successful!');

    } catch (error) {
        console.log("loginError", error)
        toast.error(error.code.split('/')[1].split('-').join(' ').toUpperCase())
    }
}

const logout = () => {
    signOut(auth)
}

export default { auth, db, login, signup, logout }