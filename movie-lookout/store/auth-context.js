import React, {useState} from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (token) => {},
    watchlist: [],
})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token)
    }

    const logoutHandler = () => {
        setToken(null);
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        watchlist: [],
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;