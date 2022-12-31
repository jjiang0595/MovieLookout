import styles from './MovieItem.module.scss';
import Link from "next/link";

function MovieItem(props) {
    return (
        <Link href={{
            pathname: `/${props.id}`,
            query: {
                key: props.id,
            }
        }}
              as={`/movies/${props.id}`}
              className={styles.movieItem}>
            <img className={styles.movieItem__image} src={props.image} alt={props.title}/>
            <span className={styles.movieItem__content}>{props.title}</span>
        </Link>
    );
}

export default MovieItem;