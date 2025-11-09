import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';



const AuthProvider = ({children}) => {
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState("")
    const [user,setUser]=useState(null)
    const googleProvider=new GoogleAuthProvider();
    // console.log(user)
    

    //register
    const userRegister=(email,password)=>{
        setLoading(true)


        return createUserWithEmailAndPassword(auth,email,password)
    }

    //user sign in implementation
    const userSignIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }

    // User sign out is here 
    const userSignOut=()=>{
        setUser(null)
        
        return signOut(auth)
    }

    //google login is here
    const googleLogin=()=>{
        return signInWithPopup(auth,googleProvider)
    }

// Update profile 
 const updateUser = (userData) => {
   setLoading(true);
   return updateProfile(auth.currentUser, userData);
 };


// On auth state change observer is here 
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    // console.log(currentUser)
    setUser(currentUser);
    setLoading(false); 
  });

  
  return () => unsubscribe();
}, []);




const userInfo = {
  userRegister,
  loading,
  setLoading,
  error,
  setError,
  user,
  userSignIn,
  userSignOut,
  googleLogin,
  updateUser,
  setUser,
};

    return <AuthContext.Provider value={userInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;