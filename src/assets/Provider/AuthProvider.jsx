import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import app from "../../../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext({
    user: null,
    createUser: () => {},
    signInWithEmailPassword: () => {},
    logOut: () => {}
});

const auth = getAuth(app);

const AuthProvider = ({ children }) => { 
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInWithEmailPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    }
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('User in the auth state changed', currentUser);
            setUser(currentUser);
            if(currentUser){
                const userInfo = {email: currentUser.email};
             axiosPublic.post('jwt', userInfo)
             .then(res => {
                if(res.data.token){
                    localStorage.setItem('access-token', res.data.token);
                }
             })
            }else{
              localStorage.removeItem('access-token');
            }
        });
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        createUser,
        signInWithEmailPassword, 
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
