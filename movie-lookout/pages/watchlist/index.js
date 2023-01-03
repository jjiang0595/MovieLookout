import {useContext, useEffect} from "react";
import MovieWatchlist from "../../components/movies/MovieWatchlist";
import AuthContext from "../../store/auth-context";
import {useRouter} from "next/router";

const Watchlist = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const router = useRouter();

    if (isLoggedIn) {
        return <MovieWatchlist/>

    }
}

export default Watchlist;