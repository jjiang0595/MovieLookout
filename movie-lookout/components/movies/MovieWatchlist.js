function MovieWatchlist() {
    const { watchlist } = useContext(MovieContext);
    return (
        <div>
        <h2>Watchlist</h2>
        {watchlist.length > 0 ? (
            <ul>
            {watchlist.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
            ))}
            </ul>
        ) : (
            <p>No movies in your watchlist, add some!</p>
        )}
        </div>
    );
}