import React, { Component } from 'react'
import { useReactiveVar } from '@apollo/client'
import { favoriteVar } from '../config/vars'
import Navbar from '../components/Navbar'
import MovieCard from '../components/MovieCard'
import { Link, useHistory } from 'react-router-dom'
export default function Favorite() {

    //isi dari favorite = [] => initial state ada di config vars
    const favorite = useReactiveVar(favoriteVar)

    return (
        <div>
            <Navbar></Navbar>
            <div className="container-fluid" id='head-container'>
                <h2 style={{ marginTop: "80px" }}>Favorite</h2>
                {
                    favorite.length?
                        <div className="d-flex row justify-content-center mx-5">
                            {
                                favorite.map(movie => {
                                    return <MovieCard key={movie._id} movie={movie} favorites={true}></MovieCard>
                                })
                            }
                        </div>
                    :
                    <div className="d-flex row justify-content-center mx-5">
                        <img className="row" src="https://i.imgur.com/Mb6vx4d.png" style={{height:'100%', marginTop:'50px'}}></img>
                        < h4 className="col-12">You dont have any favorite yet, try to add some <Link to="/">-here-</Link></h4>
                    </div>
                }
            </div>
        </div>
    )
}
