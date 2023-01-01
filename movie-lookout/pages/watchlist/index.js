import {useContext} from "react";
import MovieWatchlist from "../../components/movies/MovieWatchlist";
import AuthContext from "../../store/auth-context";
import {router} from "next/client";

const Watchlist = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    if (isLoggedIn) {
        return <MovieWatchlist />

    } else {
        router.push({
            pathname: '/login',
            query: {
                message: 'You must be logged in to view your watchlist.'
            }
        });
    }
}

export default Watchlist;