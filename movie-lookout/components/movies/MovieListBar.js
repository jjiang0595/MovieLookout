import styles from './MovieListBar.module.scss';
import Link from "next/link";

const MovieListBar = (props) => {
    return (
        <Link href={{
            pathname: `/${props.movie.id}`,
            query: {
                key: props.movie.id,
            }
        }}
              as={`/movies/${props.movie.id}`}
              className={styles.movieItem}>
            <img className={styles.movieItem__image} src={props.movie.image} alt={props.movie.title}/>
            <span className={styles.movieItem__content}>{props.movie.title}</span>
        </Link>
    );
}

export default MovieListBar;