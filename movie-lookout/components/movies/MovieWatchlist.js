import MovieItem from "./MovieItem";
import styles from './MovieWatchlist.module.scss';
import {useContext} from "react";
import AuthContext from "../../store/auth-context";

function MovieWatchlist(props) {
    const context = useContext(AuthContext);
    const watchlist = context.isLoggedIn ? context.watchlist : [];

    return (
        <div className={styles.list}>
            <h1 className={styles.list__title}>Watchlist</h1>
            {watchlist > 0 && context.watchlist.map(movie => (
                <MovieItem key={movie.id} movie={movie}/>
            ))}
            {watchlist.length === 0 &&
                <div class={styles.list__empty}>
                    <span class={styles.list__empty__text}>Your watchlist is empty.</span>
                    <img src="/dog-digging-hole.png" alt="dog digging hole" className={styles.list__empty__img}/>

                    <a href="/">Click here to add movies to your watchlist.</a>

                </div>
            }
        </div>
    );
}

export default MovieWatchlist;