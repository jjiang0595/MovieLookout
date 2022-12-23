import Head from 'next/head'
import MovieList from "../components/movies/MovieList";
import {useEffect, useState} from "react";
import AuthContext from "../store/auth-context";
import Layout from "../components/layout/Layout";

const DUMMY_MEETUPS = [
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
        <AuthContext.Provider>
            <Head>
                <title>Movie Lookout</title>
                <meta
                    name="description"
                    content="Search for your favorite movies!"
                />
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <MovieList
                movies={DUMMY_MEETUPS}
            />
        </AuthContext.Provider>

    )
}
