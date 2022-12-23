import '../styles/globals.scss'
import Layout from "../components/layout/Layout";
import {useEffect, useState} from "react";
import {AuthContextProvider} from "../store/auth-context";

export default function App({Component, pageProps}) {
    return (
        <AuthContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthContextProvider>
    )
}
