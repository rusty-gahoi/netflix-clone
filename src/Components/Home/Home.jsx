import React, { useEffect, useState } from 'react';
import './Home.scss';
import { Link } from "react-router-dom";
import axios from 'axios';
import { FaPlay } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';

const apikey = "b2513c63d3a5f88434a8e596f6c1f98f";
const url = "https://api.themoviedb.org/3";
const imgurl = "https://image.tmdb.org/t/p/original";

const upcoming = "upcoming";
const popular = "popular";
const nowplaying = "now_playing";
const toprated = "top_rated";


const Card = ({ img }) => {
    return(
        <img className='card' src={img} alt='cover'/>
    )
}



const Row = ({ title, arr }) => {
    return(
        <div className='row'>
            <h2>{title}</h2>

            <div>
                {arr.map((item, index) => {
                    return <Card key={index} img={`${imgurl}/${item.poster_path}`} />
                })}
            </div>
        </div>
    )
}

const Home = () => {

    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowplayingMovies, setNowplayingMovies] = useState([]);
    const [topratedMovies, setTopratedMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const fetchUpcoming = async() => {
            const {data: {results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`);
            setUpcomingMovies(results);

        }
        fetchUpcoming();

        const fetchPopular = async() => {
            const {data: {results}} = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`);
            setPopularMovies(results);


        }
        fetchPopular();

        const fetchNOwPlaying = async() => {
            const {data: {results}} = await axios.get(`${url}/movie/${nowplaying}?api_key=${apikey}`);
            setNowplayingMovies(results);

        }
        fetchNOwPlaying();

        const fetchTopRated = async() => {
            const {data: {results}} = await axios.get(`${url}/movie/${toprated}?api_key=${apikey}`);
            setTopratedMovies(results);

        }
        fetchTopRated();

        const fetchAllGenre = async() => {
            const {data: {genres}} = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);
            
            // console.log(genres);
            setGenre(genres);

        }
        fetchAllGenre();
        

    }, [])

  return (
    
    <section className="home">
        <div className="banner" style={{
            backgroundImage: popularMovies[0] ? `url(${`${imgurl}/${popularMovies[0].poster_path}`})` : "rgb(17, 17, 17)"
        }}>

            {
                popularMovies[0] && (
                    <h1>{popularMovies[0].original_title}</h1>
                )
            }

            {
                popularMovies[0] && (
                    <p>{popularMovies[0].overview}</p>
                )
            }

            <div>
                <button><FaPlay /> Play</button>
                <button><IoMdAdd />Add to List</button>
            </div>


        </div>

        <Row title="Upcoming Movies" arr={upcomingMovies} />
        <Row title="Popular On Netflix" arr={popularMovies} />
        <Row title="Now Playing" arr={nowplayingMovies} />
        <Row title="Top Rated" arr={topratedMovies} />

        <div className='genrebox'>
            {genre.map((item) => {
                return <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
            })}
        </div>
    </section>
  )
}

export default Home