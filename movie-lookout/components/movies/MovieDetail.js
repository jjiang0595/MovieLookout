import styles from './MovieDetail.module.scss';
import AuthContext from "../../store/auth-context";
import {useContext, useMemo, useState} from "react";
import {db} from "../../store/firebaseConfig";
import {set, ref, remove, onValue} from "firebase/database";
import MovieReviews from "./MovieReviews";

const MovieDetail = (props) => {
    const authCtx = useContext(AuthContext);
    const [favorite, setFavorite] = useState(null);
    const [transition, setTransition] = useState(false);
    const [disabled, setDisabled] = useState(false);

    useMemo(() => {
        if (authCtx.isLoggedIn) {
            const watchlistRef = ref(db, `users/${authCtx.userId}/watchlist`);
            onValue(watchlistRef, (snapshot) => {
                const data = snapshot.val();
                for (const key in data) {
                    if (data[key].id === props.movieData.id) {
                        setFavorite(true);
                    }
                }
            })
        }
    }, [authCtx.isLoggedIn]);

    const addToListHandler = async () => {
        setDisabled(true);

        setTransition(true);
        setFavorite(true);
        await set(ref(db, `users/${authCtx.userId}/watchlist/${props.movieData.id}`), {
            id: props.movieData.id,
            image: props.movieData.image,
            overview: props.movieData.overview,
        })
        setDisabled(true);

        // ALLOWS USER TO CLICK ONCE EVERY 500 MS
        setTimeout(() => {
            setDisabled(false);
        }, 500)
    }

    const removeFromListHandler = async () => {
        setDisabled(true);
        setTransition(true);
        setFavorite(false);
        await remove(ref(db, `users/${authCtx.userId}/watchlist/${props.movieData.id}`))

        setTimeout(() => {
            setDisabled(false);
        }, 500)
    }

    return (
        <>
            <div className={styles.movie}
                 style={{backgroundImage: `url(http://image.tmdb.org/t/p/w500/${props.movieData.backdrop})`}}>
                <div className={styles.movie__content}>
                    <img className={styles.movie__image}
                         src={props.movieData.image ? `http://image.tmdb.org/t/p/w500/${props.movieData.image}` : '/No-Image-Placeholder.svg'}
                         alt={props.movieData.title}/>
                    <div className={styles.movie__header}>
                        <span className={styles.movie__header__title}>{props.movieData.title}</span>
                        {authCtx.isLoggedIn &&
                            <button onClick={!favorite ? addToListHandler : removeFromListHandler}
                                    style={{transition: transition ? 'all 0.4s ease-out' : 'none'}}
                                    className={`${styles.movie__header__button} ${!favorite ? styles.movie__header__button__l : styles.movie__header__button__r}`}
                                    disabled={disabled}>
                                <svg className={`${styles.movie__header__button__heart}`}>
                                    {!favorite ?
                                        <use href="/sprite.svg#icon-heart"/>
                                        :
                                        <use href="/sprite.svg#icon-heart-broken"/>
                                    }
                                </svg>
                                <span
                                    className={styles.movie__header__button__text}>{favorite ? 'Remove from Watch List' : 'Add to Watch List'}</span>
                                {!favorite &&
                                    <svg className={styles.movie__header__button__chevron}>
                                        <use href="/sprite.svg#icon-chevron-right"></use>
                                    </svg>
                                }
                            </button>
                        }
                        <span className={styles.movie__header__overview}>{props.movieData.overview}</span>
                    </div>
                </div>
            </div>
            <MovieReviews movieId={props.movieData.id} />
        </>
    )

}

export default MovieDetail;

