import Head from 'next/head';
import MovieList from "../components/movies/MovieList";

export default function Home(props) {
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
            <MovieList
                movies={props.movies}
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
                image: movie.poster_path,
                description: movie.overview,
            }))
        },
        revalidate: 30
    }
}
