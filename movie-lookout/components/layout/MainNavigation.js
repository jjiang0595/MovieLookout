import styles from './MainNavigation.module.scss';
import {useState, useContext} from "react";
import Link from "next/link";
import AuthContext from "../../store/auth-context";

function MainNavigation() {
    const authCtx = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <header className={styles.header}>
            <Link href={'/'}>
                <img src="/MovieLookoutLogo.png" alt="movie logo" className={styles.logo}/>
            </Link>
            <form action="#" className={styles.search}>
                <input type="text" className={styles.search__input} placeholder="Search for a movie"/>
                <button className={styles.search__button}>
                    <svg className={styles.search__icon}>
                        <use href="/sprite.svg#icon-search"></use>
                    </svg>
                </button>
            </form>
            <nav className={styles.userNav}>
                {/*DISPLAY WATCHLIST ONLY WHEN LOGGED IN*/}
                <Link href="/watchlist" className={styles.userNav__iconBox}>
                    <svg className={styles.userNav__icon}>
                        <use href="/sprite.svg#icon-bookmarks"></use>
                    </svg>
                    <span className={styles.userNav__notification}>0</span>
                    <span><b>Watch List</b></span>
                </Link>
                <div className={`${styles.userNav__iconBox_user} ${isOpen ? styles.active : ''}`}
                     onClick={toggleSidebar}>
                    <svg className={styles.userNav__icon}>
                        <use href="/sprite.svg#icon-user"></use>
                    </svg>
                    <span><b>Guest</b></span>
                    {authCtx.isLoggedIn && isOpen && <div className={styles.userNav__dropdown}>
                        <Link href="/" className={styles.userNav__dropdown__a}>Settings</Link>
                        <Link href="/" className={styles.userNav__dropdown__a}>Logout</Link>
                    </div>}
                    {!authCtx.isLoggedIn && isOpen &&
                        <div className={`${styles.userNav__dropdown} ${styles.userNav__dropdown__loggedIn}`}>
                            <Link href="/" className={styles.userNav__dropdown__a}>Login</Link>
                        </div>}
                </div>
            </nav>
        </header>
    );
}

export default MainNavigation;