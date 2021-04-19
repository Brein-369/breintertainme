import React, { Component, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useQuery, gql, useMutation, useReactiveVar } from '@apollo/client'
import { favoriteVar } from '../config/vars'
import '../css/MovieCard.css'
import Swal from 'sweetalert2'
import {
    GET_MOVIES,
    DELETE_MOVIE
} from "../queries"

export default function MovieCard(props) {
    const [isFavorite, setIsFavorite] = useState(false)
    const { movie, favorites } = props
    console.log(props);
    const history = useHistory()
    function goToMovieUpdate(id) {
        console.log('masuk gotoupdate');
        history.push(`/movie/update/${id}`)
    }
    
    
    const [deleteMovie, { data: messageDelete, loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_MOVIE, {
        refetchQueries: [{ query: GET_MOVIES }]
    })
    function delMovie(id, title) {
        console.log(title,"<,<<<");
        const movieTitle = title
        deleteMovie({
            variables: {
                "theID": id
            },
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            text: `Movie ${movieTitle} Successfuly deleted`,
            showConfirmButton: false,
            timer: 1500
          })
    }
    function addToFavorite(){
        const existing = favoriteVar()
        const newData = movie
        console.log(newData);
        favoriteVar([newData, ...existing])
        setIsFavorite(true)
        Swal.fire({
            position: 'center',
            icon: 'success',
            text: `Movie ${movie.title} Successfuly added to favorites`,
            showConfirmButton: false,
            timer: 1500
          })
    }

    // const { loading, error, data: allData, refetch } = useQuery(GET_MOVIES)

    // useEffect(() => {
    //     console.log('favorite has been added!');
    //     refetch()
    // }, [favoriteVar()])
    
    function removeFromFavorite(){
        const existing = favoriteVar()
        favoriteVar([...existing.filter(e=>e._id !== movie._id)])
        Swal.fire({
            position: 'center',
            icon: 'success',
            text: `Successfuly remove ${movie.title} from favorites`,
            showConfirmButton: false,
            timer: 1500
          })
    }
    return (
        // <div className="card col-3 mx-3 my-3 pt-3 border-dark" style={{width: "18rem"}}>
        //     <img className="card-img-top" src={movie.poster_path} alt="Card image cap" />
        //     <div className="card-body">
        //         <h5 className="card-title">{movie.title}</h5>
        //         <p className="card-text">{movie.overview}</p>
        //     </div>
        //     <ul className="list-group list-group-flush">
        //         <li className="list-group-item">{movie.popularity}</li>
        //         <li className="list-group-item">{movie.tags.join(', ')}</li>
        //     </ul>
        //     <div className="card-body">
        //         <button onClick={()=>goToMovieUpdate(movie._id)}>Edit</button>
        //         <button onClick={()=>delMovie(movie._id)}>Delete</button>
        //     </div>

        // </div>
        <div class="col-md-4">
            <div class="profile-card-2">
                <img src={movie.poster_path} class="img img-responsive bg-dark" style={{backgroundColor:'black'}} />
                <div class="profile-name">{movie.title}</div>
                <div class="profile-username">{movie.overview} <br/> {movie.popularity} : {movie.tags.join(', ')}</div>
                    {
                        favorites?<div>
                            <button className="btn-danger col"onClick={removeFromFavorite}><i class="fa fa-minus-square" aria-hidden="true"></i></button>
                        </div>
                        :
                        <div>
                            <div >
                            {   
                                // favoriteVar().find(favorite=>favorite._id=== movie._id) 
                                isFavorite?
                                <div style={{backgroundColor:'black'}} className="row">
                                    <button className="btn-primary col"onClick={() => goToMovieUpdate(movie._id)}><i class="fa fa-pencil-square" aria-hidden="true"></i></button>
                                    <button className="btn-danger col"onClick={() => delMovie(movie._id, movie.title)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                </div>
                                :
                                <div style={{backgroundColor:'black'}} className="row">
                                    <button className="btn-warning col"onClick={addToFavorite}><i class="fa fa-plus-square" aria-hidden="true"></i></button>
                                    <button className="btn-primary col"onClick={() => goToMovieUpdate(movie._id)}><i class="fa fa-pencil-square" aria-hidden="true"></i></button>
                                    <button className="btn-danger col"onClick={() => delMovie(movie._id, movie.title)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                </div>

                            }
                            </div>
                        </div>
                    }
            </div>
        </div>

    )
}
