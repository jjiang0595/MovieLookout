import MovieItem from './MovieItem';
import styles from './MovieList.module.scss';

function MovieList(props) {
    return (
        <list>
            <ul className={styles.list}>
                {props.movies.map((movie) => (
                    <MovieItem
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        image={movie.image}
                        description={movie.description}
                    />
                ))}
            </ul>
        </list>
    );
}

export default MovieList;