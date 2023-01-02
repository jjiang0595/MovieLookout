// -------------------- LOCAL STORAGE ---------------------
import React, {useCallback, useEffect, useState} from "react";
import {getIdToken, getAuth, onIdTokenChanged} from "firebase/auth";
import {auth} from "./firebaseConfig";

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (token) => {},
    onAdd: (movie) => {},
    watchlist: [],
})

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        return(onIdTokenChanged(auth, (user) => {
            if(user) {
                setUser(user);
            } else {
                setUser(null);
            }
        }))
    },[]);

    const userIsLoggedIn = !!user;

    const loginHandler = (token, expirationTime) => {
        setUser(token)
    }

    const logoutHandler = useCallback(() => {
        setUser(null)
    }, [])

    const addToWatchlist = (movie) => {
        setWatchlist(prevWatchlist => {
            return prevWatchlist.concat(movie);
        });
    }

     const removeFromWatchlist = (removedMovie) => {
        setWatchlist(prevWatchlist => {
            return prevWatchlist.filter(movie => movie.id !== removedMovie);
        });
    }

     const contextValue = {
         user: user,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        addToList: addToWatchlist,
        removeFromList: removeFromWatchlist,
        watchlist: watchlist,
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;

