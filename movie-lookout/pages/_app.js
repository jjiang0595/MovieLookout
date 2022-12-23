import '../styles/globals.scss'
import AuthContext from "../store/auth-context";
import Layout from "../components/layout/Layout";
import {useEffect, useState} from "react";

export default function App({Component, pageProps}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInInformation = localStorage.getItem('isLoggedIn');

        if (loggedInInformation === '1') {
            setIsLoggedIn(true);
        }
    })
    const loginHandler = (email, password) => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
        }}>
            <Layout isAuthenticated={isLoggedIn}
                    onLogin={loginHandler}
                    onLogout={logoutHandler}
            >
            <Component {...pageProps} />
            </Layout>
        </AuthContext.Provider>
    )
}
