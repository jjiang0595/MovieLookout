import MovieItem from './MovieItem';
import styles from './MovieList.module.scss';

function MovieList(props) {
    return (
        <div className={styles.list}>
            <div>
                <h1 className={styles.list__trending}>{props.header}</h1>
                <ul className={styles.list__movies}>
                    {props.movies.map((movie) => (
                        <MovieItem
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            image={movie.image ? `http://image.tmdb.org/t/p/w500/${movie.image}` : '/No-Image-Placeholder.svg'}
                            description={movie.description}
                        />
                    ))}
                    {props.movies.length === 0 && <p className={styles.list__movies__noResults}>No movies found</p>}
                </ul>
            </div>
        </div>
    );
}

export default MovieList;