import Head from 'next/head';
import MovieList from "../components/movies/MovieList";
import {useEffect, useState} from "react";
import {withRouter} from "next/router";
import {useRouter} from "next/router";

export default function Home(props) {
    const router = useRouter();
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (router.query.message === 'success') {
            setShowMessage(true);
        }
    })

    return (
        <>
            <Head>
                <title>Movie Lookout</title>
                <meta
                    name="description"
                    content="Search for your favorite movies!"
                />
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {showMessage && <div className="success-message">SUCCCCCCEESSSSSSSSSSSSS</div>}
            <MovieList
                movies={props.movies} header="Trending Movies"
            />
        </>
    )
}

export async function getStaticProps(props) {

    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}&language=en-US&page=1`);
    const data = await res.json();
    const movies = data.results;

    return {
        props: {
            movies: movies.map(movie => ({
                id: movie.id,
                title: movie.title,
                image:  movie.poster_path,
                description: movie.overview,
            }))
        },
        revalidate: 30
    }
}

const HomeWithRouter = withRouter(Home);