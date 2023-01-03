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
            const watchlist = [];
            for (const key in data) {
                const movie = {
                    id: data[key].id,
                    image: data[key].image,
                    overview: data[key].overview,
                }
                watchlist.push(movie);
            }
            setWatchlist(watchlist);
        });
    }, []);


    return (
        <div className={styles.list}>
            <h1 className={styles.list__title}>Watchlist</h1>
            {watchlist.length > 0 && watchlist.map(movie => (
                <div className={styles.list__item} key={movie.id}>
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