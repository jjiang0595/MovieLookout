import MovieDetail from '../../components/movies/MovieDetail';

const MovieDetailsPage = (props) => {
    return (
        <MovieDetail
            title={props.title}
            image={props.image}
            description={props.description}
        />
    );
}

export const getServerSideProps = (context) => {
    // https://developers.themoviedb.org/3/movies/get-movie-details
}

export default MovieDetailsPage;