import styles from './MovieDetail.module.scss';
import AuthContext from "../../store/auth-context";
import {useContext, useState} from "react";

const MovieDetail = (props) => {
    const authCtx = useContext(AuthContext);
    const [favorite, setFavorite] = useState(false);

    const addToListHandler = () => {
        setFavorite(true);
        authCtx.addToList({
            id: props.movieData.id,
            backdrop: props.movieData.backdrop,
            title: props.movieData.title,
        });
        alert('Added to Watch List');
    }

    const removeFromListHandler = () => {
        setFavorite(false);
        authCtx.removeFromList(props.movieData.id);
        alert('Removed from Watch List');
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
                        <button onClick={!favorite ? addToListHandler : removeFromListHandler} className={`${styles.movie__header__button} ${!favorite ? styles.movie__header__button__l : styles.movie__header__button__r}`}>
                            <svg className={`${styles.movie__header__button__heart} ${!favorite && styles.pulsate}`}>
                                {!favorite ? <use href="/sprite.svg#icon-heart" /> : <use href="/sprite.svg#icon-heart-broken" />}
                            </svg>
                            <span className={styles.movie__header__button__text}>{favorite ? 'Remove from Watch List' : 'Add to Watch List'}</span>
                        </button>
                    }
                    <span className={styles.movie__header__overview}>{props.movieData.overview}</span>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail;