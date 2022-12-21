import styles from './Footer.module.scss';

function Footer() {
    return (
        <footer className={styles.footer}>
            <a href="https://www.themoviedb.org/">
                <img src="/tmdb.svg" width="100" height="100"/>
            </a>
            <span>
                    <p>All film-related metadata used in Movie Lookout, including actor, director and studio names, synopses, release dates, trailers and poster art is supplied by <a href="https://www.themoviedb.org/" className={styles.footer__a}>The Movie Database (TMDb)</a>.</p>
            </span>
            <p>© 2022-2023 Movie Lookout</p>
        </footer>
    );
}

export default Footer;