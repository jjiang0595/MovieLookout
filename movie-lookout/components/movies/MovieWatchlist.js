import styles from './MovieWatchlist.module.scss';
import {useContext} from "react";
import AuthContext from "../../store/auth-context";
import MovieListBar from "./MovieListBar";

function MovieWatchlist(props) {
    const authCtx = useContext(AuthContext);
    const watchlist = authCtx.isLoggedIn ? authCtx.watchlist : [];

    return (
        <div className={styles.list}>
            <h1 className={styles.list__title}>Watchlist</h1>
            {watchlist.length > 0 && authCtx.watchlist.map(movie => (
                <MovieListBar movie={movie.movieData} />
            ))}
            {watchlist.length === 0 &&
                <div className={styles.list__empty}>
                    <span className={styles.list__empty__text}>Your watchlist is empty.</span>
                    <img src="/dog-digging-hole.png" alt="dog digging hole" className={styles.list__empty__img}/>
                </div>
            }
        </div>
    );
}

export default MovieWatchlist;