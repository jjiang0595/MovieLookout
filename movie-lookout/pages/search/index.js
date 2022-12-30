import {useRouter} from "next/router";
import MovieList from "../../components/movies/MovieList";

const SearchResults = (props) => {
    const router = useRouter();
    const query = router.query.query;

    return (
        <div>
            <h1>Search Results for {query}</h1>
            <MovieList movies={props.movies} />
        </div>
    );
}

export async function getServerSideProps({query}) {
    const searchQuery = query.query;
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`);
    const data = await res.json();
    const movies = data.results;

    return {
        props: {
            movies: movies.map(movie => ({
                id: movie.id,
                title: movie.title,
                image: movie.poster_path,
                description: movie.overview,
            }))
        },
    }
}
export default SearchResults;