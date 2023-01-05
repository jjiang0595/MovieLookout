import React, {useCallback, useEffect, useState} from "react";
import {getIdToken, getAuth, onIdTokenChanged} from "firebase/auth";
import {auth} from "./firebaseConfig";
import {useRouter} from "next/router";


const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    logout: () => {
    },
    login: (token) => {
    },
    watchlistLength: '',
})

export const AuthContextProvider = (props) => {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [length, setLength] = useState(null);

    useEffect(() => {
        return (onIdTokenChanged(auth, (user) => {
            if (user) {
                console.log("RAN")
                setUser(user.uid);
            }
        }))
    }, []);

    const userIsLoggedIn = !!user;

    const loginHandler = (token) => {
        setUser(token)
    }

    const logoutHandler = () => {
        auth.signOut().then(() => {
            setUser(null);
            router.push({
                pathname: '/',
                query: {
                    message: 'You have been logged out',
                    backgroundColor: '#d4edda',
                }
            });
        })
    }

    const setWatchlistLength = (length) => {
        setLength(length)
    }

    const contextValue = {
        userId: user,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        setLength: setWatchlistLength,
        watchlistLength: length
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;

