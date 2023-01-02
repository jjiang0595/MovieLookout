import styles from './MovieWatchlist.module.scss';
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import {db} from "../../store/firebaseConfig";
import {onValue, ref} from "firebase/database";

function MovieWatchlist() {
    const authCtx = useContext(AuthContext);
    const [watchlist, setWatchlist] = authCtx.isLoggedIn ? useState([]) : [];
    const watchlistRef = ref(db, `users/${authCtx.user.uid}/watchlist`);

    useEffect(() => {
    onValue(watchlistRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        // WORKS, BUT NEEDS TO BE REFACTORED
        // REPLACE ALL authCtx.watchlist with this new way of getting the watchlist
    });
    }, []);


    return (
        <div className={styles.list}>
            <h1 className={styles.list__title}>Watchlist</h1>
            {watchlist.length > 0 && authCtx.watchlist.map(movie => (
                <div className={styles.list__item}>
                    <img className={styles.list__item__poster} src={`http://image.tmdb.org/t/p/w500/${movie.image}`}/>
                    <span className={styles.list__item__overview}>{movie.overview}</span>
                </div>
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