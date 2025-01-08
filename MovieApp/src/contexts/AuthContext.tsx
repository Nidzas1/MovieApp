import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../config/config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { UserLogin, UserSignUp } from '../types/User';

const AuthContext = React.createContext({})

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
    const [currentUser, setCurrentUser] = useState<User | null>()
    const [loading, setLoading] = useState<boolean>(true)


    async function signup({ email, password, firstName, lastName, country, city, profilePicture }: UserSignUp) {
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCred.user

            const userDocRef = doc(collection(db, 'users'), user.uid)

            await setDoc(userDocRef, {
                userId: user.uid,
                email: email,
                firstName: firstName,
                lastName: lastName,
                country: country,
                city: city,
                moviesLiked: [],
                profilePicture: profilePicture,
            })


        } catch (error) {
            console.error("Error signing up:", error);
        }
    }

    function signin({ email, password }: UserLogin) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function signout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);



    const value = {
        currentUser,
        signup,
        signin,
        signout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}