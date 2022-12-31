import styles from './MovieDetail.module.scss';
import AuthContext from "../../store/auth-context";
import {useContext, useState} from "react";

const MovieDetail = (props) => {
    const authCtx = useContext(AuthContext);
    const [favorite, setFavorite] = useState(false);


    const addToListHandler = () => {
        authCtx.addToList({
            id: props.movieData.id,
            backdrop: props.movieData.backdrop,
            title: props.movieData.title,
        });
        console.log(authCtx.watchlist)
        alert('Added to Watch List');
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
                        <button onClick={addToListHandler} className={styles.movie__header__watchlist}>Add to
                            Watchlist</button>}
                    <span className={styles.movie__header__overview}>{props.movieData.overview}</span>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail;