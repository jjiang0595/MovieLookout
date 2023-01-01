import styles from './MovieDetail.module.scss';
import AuthContext from "../../store/auth-context";
import {useContext, useEffect, useState} from "react";

const MovieDetail = (props) => {
    const authCtx = useContext(AuthContext);
    const [favorite, setFavorite] = useState(false);
    const [transition, setTransition] = useState(false);

    useEffect(() => {
        if (authCtx.isLoggedIn) {
            const isFavorite = authCtx.watchlist.find(movie => movie.id === props.movieData.id);
            setFavorite(isFavorite);
        }
    }, [authCtx.isLoggedIn]);

    const addToListHandler = () => {
        setTransition(true);
        setFavorite(true);
        authCtx.addToList({
            id: props.movieData.id,
            image: props.movieData.image,
            overview: props.movieData.overview,
        });
            console.log(authCtx.watchlist)
    }

    const removeFromListHandler = () => {
        setTransition(true);
        setFavorite(false);
        authCtx.removeFromList(props.movieData.id);
        console.log(authCtx.watchlist)
    }

    return (
        <div className={styles.movie}
             style={{backgroundImage: `url(http://image.tmdb.org/t/p/w500/${props.movieData.backdrop})`}}>
            <div className={styles.movie__content}>
                <img className={styles.movie__image}
                     src={props.movieData.image ? `http://image.tmdb.org/t/p/w500/${props.movieData.image}` : '/No-Image-Placeholder.svg'}
                     alt={props.movieData.title}/>
                <div className={styles.movie__header}>
                    <span className={styles.movie__header__title}>{props.movieData.title}</span>
                    {authCtx.isLoggedIn &&
                        <button onClick={!favorite ? addToListHandler : removeFromListHandler} style={{transition: transition ? 'all 0.4s ease-out' : 'none'}}
                                className={`${styles.movie__header__button} ${!favorite ? styles.movie__header__button__l : styles.movie__header__button__r}`}>
                            <svg className={`${styles.movie__header__button__heart}`}>
                                {!favorite ? <use href="/sprite.svg#icon-heart"/> :
                                    <use href="/sprite.svg#icon-heart-broken"/>}
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
    )
}

export default MovieDetail;

