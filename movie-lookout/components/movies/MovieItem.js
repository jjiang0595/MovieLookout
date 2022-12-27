import styles from './MovieItem.module.scss';
import Card from '../ui/Card';
import Link from "next/link";

function MovieItem(props) {
    return (
        <Link href={{
            pathname: `/${props.id}`,
            query: {
                key: `${props.id}`,
                id: props.id,
                title: `${props.title}`,
                image: `http://image.tmdb.org/t/p/w500/${props.image}`,
                description: props.description
            }
        }}
              as={`/${props.id}`}
              className={styles.movieItem}>
            <img className={styles.movieItem__image} src={props.image} alt={props.title}/>
            <span className={styles.movieItem__content}>{props.title}</span>
        </Link>
    );
}

export default MovieItem;