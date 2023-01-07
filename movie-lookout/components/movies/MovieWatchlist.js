import styles from './MovieWatchlist.module.scss';
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import {db} from "../../store/firebaseConfig";
import {onValue, ref} from "firebase/database";
import WatchlistItem from "../ui/WatchlistItem";

// ----------------------------------------------------------------------
// | WHAT TO DO TOMORROW                                                |
// | SHOW A MOVIES NOT FOUND MESSAGE WHEN THE SEARCH RETURNS NO RESULTS |
// ----------------------------------------------------------------------


function MovieWatchlist() {
    const authCtx = useContext(AuthContext);
    const [watchlist, setWatchlist] = authCtx.isLoggedIn ? useState([]) : [];
    const watchlistRef = ref(db, `users/${authCtx.userId}/watchlist`);


    useEffect(() => {
        onValue(watchlistRef, (snapshot) => {
            const data = snapshot.val();
            const newWatchlist = [];
            for (const key in data) {
                const movie = {
                    id: data[key].id,
                    image: data[key].image,
                    overview: data[key].overview,
                }
                newWatchlist.push(movie);
            }
            setWatchlist(newWatchlist);
        });
    }, []);

    return (
        <div className={styles.container}>
            <span className={styles.title}>Watchlist</span>

            {watchlist.length > 0 &&
                <>
                    <div className={styles.list}>
                        {watchlist.map(movie => (
                            <WatchlistItem key={movie.id} movieId={movie.id} image={movie.image}/>
                        ))}
                    </div>
                    <img src="/jerry_sleeping.png" alt="jerry sleeping" className={styles.list__empty__img}/>
                </>
            }

            {watchlist.length === 0 &&
                <>
                    <div className={styles.list__empty}>
                        <span className={styles.list__empty__text}>Your watchlist is empty.</span>
                    </div>
                    <img src="/dog-digging-hole.png" alt="dog digging hole" className={styles.list__empty__img}/>
                </>
            }
        </div>
    );
}

export default MovieWatchlist;