import '../styles/globals.scss'
import MainNavigation from "../components/layout/MainNavigation";

export default function App({Component, pageProps}) {
    return (
        <MainNavigation>
            <Component {...pageProps} />
        </MainNavigation>
    )
}
