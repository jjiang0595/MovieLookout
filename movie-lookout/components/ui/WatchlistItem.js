import {useContext} from "react";
import Link from "next/link";
import styles from "./WatchlistItem.module.scss";
import {ref, remove} from "firebase/database";
import {db} from "../../store/firebaseConfig";
import AuthContext from "../../store/auth-context";

const WatchlistItem = (props) => {
    const authCtx = useContext(AuthContext);

    const deleteWatchlistItem = async () => {
        await remove(ref(db, `users/${authCtx.userId}/watchlist/${props.movieId}`))
    }

    return (
        <div className={styles.item} key={props.movieId}>
            <Link href={{
                pathname: `/${props.movieId}`,
                query: {
                    key: props.movieId,
                }
            }} as={`/movies/${props.movieId}`}>
                <img className={styles.item__poster}
                     src={`http://image.tmdb.org/t/p/w500/${props.image}`}>
                </img>
            </Link>
            <button className={styles.item__button} onClick={deleteWatchlistItem}>
                <svg className={styles.item__button__icon}>
                    <use href="/sprite.svg#icon-checkmark"></use>
                </svg>
            </button>
        </div>
)
}

export default WatchlistItem;