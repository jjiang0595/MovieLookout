import {useMemo} from "react";
import MovieWatchlist from "../../components/movies/MovieWatchlist";
import {useRouter} from "next/router";
import {auth} from '../../store/firebaseConfig';

const Watchlist = () => {
    const user = auth.currentUser;
    const router = useRouter();

    if (typeof window === "undefined") return null;


    useMemo(() => {
        if (!user) {
            router.push({
                pathname: '/login',
                query: {
                    message: 'You must be logged in to view your watchlist'
                }
            }, '/login');
        } else {
            return <MovieWatchlist/>
        }
    }, [user])

    if (user) {
        return <MovieWatchlist/>
    }
}

export default Watchlist;