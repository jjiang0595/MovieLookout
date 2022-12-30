import styles from './Searchbar.module.scss';
import {useRef, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

const Searchbar = (props) => {
    const query = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const router = useRouter();

    const searchHandler = async (event) => {
        const query = event.target.value;

        if (query.length > 2) {
            setShowResults(true)
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
            const res = await fetch(url);
            const data = await res.json();
            const filteredMovies = data.results.filter((item, idx) => idx < 5).map(movie => ({
                movieId: movie.id,
                title: movie.title,
                image: movie.poster_path,
                description: movie.overview
            }));

            setSearchResults(filteredMovies);
        } else {
            setShowResults(false);
            setSearchResults([]);
        }
    }

    const deleteSearchTerm = () => {
        setSearchResults([]);
        setShowResults(false);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setShowResults(false);

        router.push({
            pathname: '/search',
            search: `?query=${query.current.value}`,
            query: {
                query: query.current.value,
                title: 'Search Results'
            }
        })
    }

    return (
        <form action="#" className={styles.search} onSubmit={submitHandler}>
            <input type="text" ref={query} onChange={searchHandler}
                   className={`${styles.search__input} ${showResults ? styles.search__input__bottom : ''}`}
                   placeholder="Search for a movie..."/>
            <button className={styles.search__button}>
                <svg className={styles.search__icon}>
                    <use href="/sprite.svg#icon-search"></use>
                </svg>
            </button>
            <div className={styles.search__results}>
                {showResults && searchResults.map((movie) => (
                    <Link href={{
                        pathname: `/movies/${movie.movieId}`,
                        query: {
                            movieId: movie.movieId,
                            title: `${movie.title}`,
                            image: `http://image.tmdb.org/t/p/w500/${movie.image}`,
                            description: movie.description
                        }
                    }} as={`/movies/${movie.movieId}`} className={styles.search__results__item} onClick={deleteSearchTerm}>
                        <span className={styles.search__results__item__title}>{movie.title}</span>
                    </Link>
                ))}
                {searchResults.length === 0 && showResults &&
                    <p className={styles.search__results__item}>No results found</p>}
            </div>
            {showResults ? <div className={styles.overlay} onClick={deleteSearchTerm} /> : null}
        </form>
    )
}

export default Searchbar;
