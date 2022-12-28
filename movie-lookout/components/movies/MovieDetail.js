import styles from './MovieDetail.module.scss';

const MovieDetail = (props) => {
    return (
        <div className={styles.movie} style={{backgroundImage: `url${props.movieData.backdrop}`}}>
            <img className={styles.movie__image} src={`http://image.tmdb.org/t/p/w500/${props.movieData.image}`} alt={props.movieData.title}/>
            <span className={styles.movie__title}>{props.movieData.title}</span>
            <span className={styles.movie__overview}>{props.movieData.overview}</span>
        </div>
    )
}

export default MovieDetail;