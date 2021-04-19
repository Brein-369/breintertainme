import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import Navbar from '../components/Navbar'
import '../css/AddMovie.css'
import Swal from 'sweetalert2'
import {
    GET_MOVIES,
    ADD_MOVIE
} from "../queries"

export default function AddMovies() {
    
    const [inputMovie, setInputMovie] = useState({
        title: '',
        overview: '',
        poster_path: '',
        popularity: 0,
        tags: ''
    })
    function submitMovie(event) {
        event.preventDefault()
        console.log(event.target.inputTitle.value);
        //careful here, kalo typenya ga sesuai bakal error
        if(inputMovie.title && inputMovie.overview && inputMovie.poster_path && inputMovie.popularity && inputMovie.tags){
            addMovie({
                variables: {
                    inputData: { ...inputMovie, popularity: parseFloat(inputMovie.popularity) }
                }
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                text: 'Movie has been added',
                showConfirmButton: false,
                timer: 1500
              })
              setInputMovie({
                title: '',
                overview: '',
                poster_path: '',
                popularity: 0,
                tags: ''
            })
        }
        else{
            console.log('masuk else submit movie');
            Swal.fire({
                icon: 'error',
                text: 'All input must be filled'
              })
        }
        
    }
    function handlingChange(event) {
        if(event.target.poster_path){
            console.log(event.target.poster_path.value);
        }
        setInputMovie({
            ...inputMovie,
            [event.target.name]: event.target.value
        })
        console.log(inputMovie);
    }
    
    const [addMovie, { data: mutationDataResult, loading, error }] = useMutation(ADD_MOVIE, {
        refetchQueries:[{ query: GET_MOVIES }]
    })

    return (
        <div>
            <Navbar></Navbar>
            <h3>Add Movie Here</h3>
            <div className="registration-form">
                <form onSubmit={(event) => submitMovie(event)}>
                    <div className="form-group">
                        <label for="inputTitle">Title</label>
                        <input type="text" className="form-control item" id="inputTitle" name="title" value={inputMovie.title} onChange={handlingChange} placeholder="Enter title" />
                    </div>
                    <div className="form-group">
                        <label for="inputOverview">Overview</label>
                        <textarea className="form-control item" id="inputOverview" rows="3" name="overview" value={inputMovie.overview} onChange={handlingChange} placeholder="Enter overview"></textarea>
                    </div>
                    <div className="form-group">
                        <label for="inputPosterPath">Poster Path</label>
                        <input type="text" className="form-control item" id="inputPosterPath" name="poster_path" value={inputMovie.poster_path} onChange={handlingChange} placeholder="Enter Poster URL" />
                    </div>
                    <div className="form-group">
                        <label for="inputPopularity">Popularity</label>
                        <input type="number" step="0.1" max="5" min="0" className="form-control item" name="popularity" id="inputPopularity" value={inputMovie.popularity} onChange={handlingChange} placeholder="Enter Popularity Rating (0-5)" />
                    </div>
                    <div className="form-group">
                        <label for="inputTags">Tags</label>
                        <input type="text" className="form-control item" id="inputTags" name="tags" value={inputMovie.tags} onChange={handlingChange} aria-describedby="tagsHelp" placeholder="Enter tags" />
                        <small id="tagsHelp" className="form-text text-muted">Example Tags Format: crime, drama, adventure</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
