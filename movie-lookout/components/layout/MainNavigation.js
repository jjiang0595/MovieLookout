import styles from './MainNavigation.module.scss';
import {useState, useContext, useMemo, useEffect} from "react";
import Link from "next/link";
import AuthContext from "../../store/auth-context";
import Searchbar from "./Searchbar";
import {ref, onValue} from "firebase/database";
import {db} from "../../store/firebaseConfig";

function MainNavigation() {
    const authCtx = useContext(AuthContext);
    const watchlistLength = useMemo(() => {
        return authCtx.watchlistLength;
    })
    const [logo, setLogo] = useState(true);
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 460px)');
        const handleMediaQueryChange = (e) => {
            if (e.matches) {
                setLogo(false);
                console.log("A")
            } else {
                setLogo(true);
                console.log("B")
            }
        }

        handleMediaQueryChange(mediaQuery);
        mediaQuery.addEventListener('change', handleMediaQueryChange);
    }, [])

    useEffect(() => {
        const watchlistRef = ref(db, `users/${authCtx.userId}/watchlist`);
        onValue(watchlistRef, (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
                const data = snapshot.val();
                authCtx.setLength(Object.keys(data).length);
            } else {
                authCtx.setLength(0);
            }
        })
    }, [authCtx.userId])


    return (
        <header className={styles.header}>
            <Link href={'/'}>
                {logo ?
                    <img src="/NewMovieLookoutLogo.png" alt="movie logo" className={styles.logo}/>
                    :
                    <img src="/MovieLookoutInitials.png" alt="movie logo" className={styles.logo}/>
                }
            </Link>
            <Searchbar/>
            <nav className={styles.userNav}>
                <Link href="/watchlist" className={styles.userNav__iconBox}>
                    <svg className={styles.userNav__icon}>
                        <use href="/sprite.svg#icon-bookmarks"></use>
                    </svg>
                    {authCtx.isLoggedIn &&
                        <span className={styles.userNav__notification}>{watchlistLength}</span>}
                    <span className={styles.userNav__text}>Watchlist</span>
                </Link>
                <div className={`${styles.userNav__iconBox__user}`}>
                    <svg className={styles.userNav__icon}>
                        <use href="/sprite.svg#icon-user"></use>
                    </svg>
                    {!authCtx.isLoggedIn &&
                        <span className={styles.userNav__text}>Guest</span>
                    }

                    {authCtx.isLoggedIn && <div className={styles.userNav__dropdown} style={{width: '7rem'}}>
                        <Link href="/" className={styles.userNav__dropdown__a} onClick={authCtx.logout}>Logout</Link>
                    </div>}
                    {!authCtx.isLoggedIn &&
                        <div className={styles.userNav__dropdown}>
                            <Link href="/login" className={styles.userNav__dropdown__a}>Login</Link>
                        </div>}
                </div>
            </nav>
        </header>
    );
}

export default MainNavigation;