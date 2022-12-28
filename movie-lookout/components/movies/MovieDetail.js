const MovieDetail = (props) => {
    console.log(props.movieData.title);
    return (
        <span>{props.movieData.title}</span>
    )
}

export default MovieDetail;