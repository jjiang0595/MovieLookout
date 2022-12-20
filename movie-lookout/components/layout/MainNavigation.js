import styles from './MainNavigation.module.scss';
function MainNavigation() {
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
                        <span>Watch List</span>
                    </div>
                    <div className={styles.userNav__iconBox}>
                        <svg className={styles.userNav__icon}>
                            <use href="/sprite.svg#icon-user"></use>
                        </svg>
                        <span>Guest</span>
                    </div>
                </nav>
        </header>
    );
}

export default MainNavigation;