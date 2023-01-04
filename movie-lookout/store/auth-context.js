import React, {useCallback, useEffect, useState} from "react";
import {getIdToken, getAuth, onIdTokenChanged} from "firebase/auth";
import {auth} from "./firebaseConfig";

let logoutTimer;

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
    const [user, setUser] = useState(null);
    const [length, setLength] = useState(null);

    useEffect(() => {
        return (onIdTokenChanged(auth, (user) => {
            if (user) {
                setUser(user.uid);
            } else {
                setUser(null);
            }
        }))
    }, []);

    const userIsLoggedIn = !!user;

    const loginHandler = (token) => {
        setUser(token)
    }

    const logoutHandler = useCallback(() => {
        setUser(null)
    }, [])

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

