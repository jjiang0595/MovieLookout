import styles from './Searchbar.module.scss';
import {useState} from "react";

const Searchbar = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const searchHandler = async (event) => {
        const query = event.target.value;
        setSearchTerm(query);
        console.log(searchTerm, query)

        if (query.length > 3) {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
            const res = await fetch(url);
            const data = await res.json();
            const filteredMovies = data.results.filter((item, idx) => idx < 5).map(movie => ({
                id: movie.id,
                title: movie.original_title
            }));

            setSearchResults(filteredMovies);
            console.log(filteredMovies)
        } else {
            setSearchResults([]);
        }
    }

    return (
        <form action="#" className={styles.search}>
            <input type="text" onChange={searchHandler} className={styles.search__input} placeholder="Search for a movie"/>
            <button className={styles.search__button}>
                <svg className={styles.search__icon}>
                    <use href="/sprite.svg#icon-search"></use>
                </svg>
            </button>
            <div className={styles.search__results}>
                {searchResults.map((movie, idx) => (
                    <a href="#" className={styles.search__results__item} key={movie.id}>
                        <span className={styles.search__results__item__title}>{movie.title}</span>
                    </a>
                ))}
            </div>
        </form>
    )
}

export default Searchbar;
