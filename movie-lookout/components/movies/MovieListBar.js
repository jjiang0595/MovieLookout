import styles from './MovieListBar.module.scss';
import Link from "next/link";

const MovieListBar = (props) => {
    return (
            <span className={styles.movieItem__content}>{props.movie.title}</span>
    );
}

export default MovieListBar;