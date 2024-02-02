import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import {doc,setDoc}from 'firebase/firestore'

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setuser] = useState({})
    useEffect(()=>{
        const unsubscribed=onAuthStateChanged(auth,(currentuser)=>{
            setuser(currentuser)

        })
        return ()=>{
            unsubscribed();
        }
    },[])
    function signup(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db,'users',email),{
            favShows:[],
        })
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return signOut(auth)
    }

    return (
        <AuthContext.Provider value={{user,signup,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext);
}