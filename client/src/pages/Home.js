import '../css/Home.css'
import React, { useState } from 'react'
import { useQuery, gql, useMutation, from } from '@apollo/client'
import { Link, useHistory } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import SeriesCard from '../components/SeriesCard'
import Navbar from '../components/Navbar'
import {
    GET_MOVIES
} from "../queries"


export default function Home() {

    const { loading, error, data: allData } = useQuery(GET_MOVIES)

    if (loading) {
        return <h1>LOADING...</h1>
    }
    // style={{backgroundImage:`url(https://i.imgur.com/IZUnnyT.png)`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
    return (

        <div id="home" class="top-level-home" >
            <Navbar></Navbar>
            <div className='row' style={{ backgroundColor: 'black' }} id='second-level-home'>
                <div className="col-4 my-auto">
                    <h1 className="text-right" style={{textShadow: '5px 5px 5px purple'}}>
                        ENTERTAINME
                    </h1>
                    <h4 className="text-right text-white mt-4">
                        Your Popcorn Always Deserve <br/><span style={{fontSize:'40px'}}>Good Movies</span>.
                    </h4>
                </div>
                <div className="col-8 mask1">
                    <img src='https://images.pexels.com/photos/3811867/pexels-photo-3811867.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' style={{ width: '80%', float:'right'}}></img>
                </div>
            </div>
            <div className="container-fluid" id='head-container'>

                <h2 style={{marginTop:"80px"}}>All Movies</h2>
                <div className="d-flex row justify-content-center mx-5">
                    {
                        allData.movies.map(movie => {
                            return <MovieCard key={movie._id} movie={movie}></MovieCard>
                        })
                    }
                </div>
                <h2 style={{marginTop:"80px"}}>All Series</h2>
                <div className="d-flex row justify-content-center mx-5">
                    {
                        allData.series.map(serie => {
                            return <SeriesCard key={serie._id} series={serie}></SeriesCard>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
