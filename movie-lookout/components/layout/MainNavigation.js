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

    if (authCtx.isLoggedIn) {
        const watchlistLengthRef = ref(db, `users/${authCtx.userId}/watchlist`)
        onValue(watchlistLengthRef, snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                authCtx.setLength(Object.keys(data).length);
            }
        })
    }


    return (
        <header className={styles.header}>
            <Link href={'/'}>
                <img src="/MovieLookoutLogo.png" alt="movie logo" className={styles.logo}/>
            </Link>
            <Searchbar/>
            <nav className={styles.userNav}>
                <Link href="/watchlist" className={styles.userNav__iconBox}>
                    <svg className={styles.userNav__icon}>
                        <use href="/sprite.svg#icon-bookmarks"></use>
                    </svg>
                    {authCtx.isLoggedIn &&
                        <span className={styles.userNav__notification}>{watchlistLength}</span>}
                    <span><b>Watch List</b></span>
                </Link>
                <div className={`${styles.userNav__iconBox_user}`}>
                    <svg className={styles.userNav__icon}>
                        <use href="/sprite.svg#icon-user"></use>
                    </svg>
                    <span><b>Guest</b></span>

                    {authCtx.isLoggedIn && <div className={styles.userNav__dropdown}>
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