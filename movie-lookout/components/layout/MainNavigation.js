import styles from './MainNavigation.module.scss';
import {useState} from "react";
import Link from "next/link";

function MainNavigation() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    }


    return (
        <header className={styles.header}>
            <img src="/MovieLookoutLogo.png" alt="movie logo" className={styles.logo} />
                <form action="#" className={styles.search}>
                    <input type="text" className={styles.search__input} placeholder="Search for a movie" />
                        <button className={styles.search__button}>
                            <svg className={styles.search__icon}>
                                <use href="/sprite.svg#icon-search" ></use>
                            </svg>
                        </button>
                </form>
                <nav className={styles.userNav}>
                    <div className={styles.userNav__iconBox}>
                        <svg className={styles.userNav__icon}>
                            <use href="/sprite.svg#icon-bookmarks"></use>
                        </svg>
                        <span className={styles.userNav__notification}>7</span>
                        <span><b>Watch List</b></span>
                    </div>
                    <div className={`${styles.userNav__iconBox_user} ${isOpen ? styles.active : ''}`} onClick={toggleSidebar}>
                        <svg className={styles.userNav__icon}>
                            <use href="/sprite.svg#icon-user"></use>
                        </svg>
                        <span><b>Guest</b></span>
                        {isOpen && <div className={styles.userNav__dropdown}>
                            <Link href="/" className={styles.userNav__anchor}>Settings</Link>
                            <Link href="/" className={styles.userNav__anchor}>Logout</Link>
                        </div>}
                    </div>
                </nav>
        </header>
    );
}

export default MainNavigation;