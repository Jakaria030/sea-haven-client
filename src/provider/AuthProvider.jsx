import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create user with email
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // update user profile
    const updateUserProfile = (updateData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updateData);
    };

    // sign in user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // continue with google
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider);
    };

    // sign out user
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Holding the current user
    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };            
    }, [user, setUser]);


    const userInfo = {
        user,
        setUser,
        createUser,
        updateUserProfile,
        signInUser,
        signInWithGoogle,
        signOutUser,
        loading,
        setLoading
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;