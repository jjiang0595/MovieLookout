import React, {useCallback, useEffect, useState} from "react";

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: true,
    onLogout: () => {},
    onLogin: (token) => {},
    onAdd: (movie) => {},
    onRemove: (movie) => {},
    watchlist: [],
})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState('aaa');
    const [watchlist, setWatchlist] = useState([]);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token)
    }

    const logoutHandler = () => {
        setToken(null)
    }

    const addToWatchlist = (movie) => {
        setWatchlist(prevWatchlist => {
            return prevWatchlist.concat({...movie});
        });
    }

    const removeFromWatchlist = (removedMovie) => {
        setWatchlist(prevWatchlist => {
            return prevWatchlist.filter(movie => movie.id !== removedMovie.id);
        });
    }

    const contextValue = {
        token: token,
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


// -------------------- LOCAL STORAGE ---------------------
// import React, {useCallback, useEffect, useState} from "react";
//
// let logoutTimer;
//
// const AuthContext = React.createContext({
//     token: '',
//     isLoggedIn: false,
//     onLogout: () => {},
//     onLogin: (token) => {},
//     onAdd: (movie) => {},
//     watchlist: [],
// })
//
// export const AuthContextProvider = (props) => {
//     const initialToken = localStorage.getItem('token');
//     const [token, setToken] = useState(initialToken);
//     const [watchlist, setWatchlist] = useState([]);
//
//     const userIsLoggedIn = !!token;
//
//     const loginHandler = (token, expirationTime) => {
//         setToken(token)
//         localStorage.setItem('token', token)
//         localStorage.setItem('expirationTime', expirationTime)
//         logoutTimer = setTimeout(logoutHandler, expirationTime - Date.now())
//     }
//
//     const logoutHandler = useCallback(() => {
//         setToken(null)
//         localStorage.removeItem('token')
//         localStorage.removeItem('expirationTime')
//         clearTimeout(logoutTimer)
//     }, [])
//
//     useEffect(() => {
//         if (token) {
//             let remainingTime = localStorage.getItem('expirationTime') - Date.now()
//             if (remainingTime < 6000) remainingTime = 0;
//             logoutTimer = setTimeout(logoutHandler, remainingTime)
//         }
//     }, [token, logoutHandler])
//
//     const addToWatchlist = (movie) => {
//         setWatchlist(prevWatchlist => {
//             return prevWatchlist.concat(movie);
//         });
//     }
//
//     const contextValue = {
//         token: token,
//         isLoggedIn: userIsLoggedIn,
//         login: loginHandler,
//         logout: logoutHandler,
//         addToList: addToWatchlist,
//         watchlist: watchlist,
//     }
//
//     return <AuthContext.Provider value={contextValue}>
//         {props.children}
//     </AuthContext.Provider>
// }
//
// export default AuthContext;
//
