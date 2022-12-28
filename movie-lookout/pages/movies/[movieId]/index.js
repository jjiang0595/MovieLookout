import MovieDetail from '../../../components/movies/MovieDetail';

const MovieDetailsPage = (props) => {
    return (
        <MovieDetail
            movieData={props.movieData}
        />
    );
}


export async function getServerSideProps(context) {
    const movieId = context.params.movieId;

    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}&language=en-US`;

    const res = await fetch(url);
    const data = await res.json();


    return {
        props: {
            movieData: {
                title: data.title,
                overview: data.overview,
                backdrop: data.backdrop_path,
                image: data.poster_path
            }
        }
    }

}

export default MovieDetailsPage;