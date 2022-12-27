import Head from 'next/head'
import MovieList from "../components/movies/MovieList";
import {useEffect, useState} from "react";
import AuthContext from "../store/auth-context";
import Layout from "../components/layout/Layout";

const DUMMY_MOVIES
    = [
    {
        id: 'm1',
        title: 'Black Adam',
        image: 'https://static.dc.com/2022-11/Black_Adam_S_DD_KA_TT_3000x3000_300dpi_EN.jpeg?w=1200',
        description: 'This is a first movie!'
    },
    {
        id: 'm2',
        title: 'A Second movie',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Pyramids_of_the_Giza_Necropolis.jpg/1920px-Pyramids_of_the_Giza_Necropolis.jpg',
        description: 'This is a second movie!'
    },
    {
        id: 'm1',
        title: 'A First movie',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Pyramids_of_the_Giza_Necropolis.jpg/1920px-Pyramids_of_the_Giza_Necropolis.jpg',
        description: 'This is a first movie!'
    },
    {
        id: 'm2',
        title: 'A Second movie',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Pyramids_of_the_Giza_Necropolis.jpg/1920px-Pyramids_of_the_Giza_Necropolis.jpg',
        description: 'This is a second movie!'
    },
    {
        id: 'm1',
        title: 'A First movie',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Pyramids_of_the_Giza_Necropolis.jpg/1920px-Pyramids_of_the_Giza_Necropolis.jpg',
        description: 'This is a first movie!'
    },
    {
        id: 'm2',
        title: 'A Second movie',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Pyramids_of_the_Giza_Necropolis.jpg/1920px-Pyramids_of_the_Giza_Necropolis.jpg',
        description: 'This is a second movie!'
    },
    {
        id: 'm1',
        title: 'A First movie',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Pyramids_of_the_Giza_Necropolis.jpg/1920px-Pyramids_of_the_Giza_Necropolis.jpg',
        description: 'This is a first movie!'
    },
    {
        id: 'm2',
        title: 'A Second movie',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Pyramids_of_the_Giza_Necropolis.jpg/1920px-Pyramids_of_the_Giza_Necropolis.jpg',
        description: 'This is a second movie!'
    },

]

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
                title: movie.original_title,
                image: movie.poster_path,
                description: movie.overview,


            }))
        },
        revalidate: 1
    }
}
