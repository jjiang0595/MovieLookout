import MovieItem from './MovieItem';
import styles from './MovieList.module.scss';

function MovieList(props) {
    return (
        <div className={styles.list}>
            <list>
                <h1 className={styles.list__trending}>Trending</h1>
                <ul className={styles.list__movies}>
                    {props.movies.map((movie) => (
                        <MovieItem
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            image={`http://image.tmdb.org/t/p/w500/${movie.image}`}
                            description={movie.description}
                        />
                    ))}
                </ul>
            </list>
        </div>
    );
}

export default MovieList;