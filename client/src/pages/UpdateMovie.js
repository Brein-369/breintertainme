import React, { useState, useEffect, useMemo } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {useHistory} from 'react-router-dom'
import {
    GET_MOVIES,
    GET_ONE_MOVIE,
    UPDATE_MOVIE
} from "../queries"

export default function UpdateMovie() {
    const history = useHistory()
    const { id } = useParams()
    const [inputMovie, setInputMovie] = useState({})

    async function submitMovie(event) {
        event.preventDefault()
        console.log(inputMovie,"<<< input movie mau di update");
        //careful here, kalo typenya ga sesuai bakal error
        await updateMovie({
            variables: {
                inputData: {
                    ...inputMovie,
                    popularity: parseFloat(inputMovie.popularity)
                }
            }
        })
        await history.push('/')
    }
    function handlingChange(event) {
        setInputMovie({
            ...inputMovie,
            [event.target.name]: event.target.value
        })
        console.log(inputMovie);
    }

    const { data, loading, error } = useQuery(GET_ONE_MOVIE, {
        variables: {
            "theID": id
        },
        onCompleted: data=>{
            console.log(data, "<<<data on completed");
            setInputMovie(
                {
                    id: data.getOneMovies._id,
                    title: data.getOneMovies.title,
                    overview: data.getOneMovies.overview,
                    poster_path: data.getOneMovies.poster_path,
                    popularity: parseFloat(data.getOneMovies.popularity),
                    tags: data.getOneMovies.tags.join(", ")
                })
        } 
    })
    // useEffect(() => {
    //     console.log(error, '<<< error get one movie');
    //     console.log(data,"<<< one movie data");
    //     // setInputMovie({
    //     //     id: data.getOneMovies._id,
    //     //     title: data.getOneMovies.title,
    //     //     overview: data.getOneMovies.overview,
    //     //     poster_path: data.getOneMovies.poster_path,
    //     //     popularity: parseFloat(data.getOneMovies.popularity),
    //     //     tags: data.getOneMovies.tags.join(", ")
    //     // })
    // }, [data])

    
    const [updateMovie, { data: mutationDataResult, loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_MOVIE, {
        refetchQueries: [{ query: GET_MOVIES }]
    })

    if (loading) {
        <h1>LOADING</h1>
    }
    return (
        <div>
            <Navbar></Navbar>
            <h3>Edit Movie Here</h3>
            <div className="registration-form">
            <form onSubmit={(event) => submitMovie(event)}>
                <div className="form-group">
                    <label for="inputTitle">Title</label>
                    <input type="text" className="form-control" id="inputTitle" name="title" value={inputMovie.title} onChange={handlingChange} placeholder="Enter title" />
                </div>
                <div className="form-group">
                    <label for="inputOverview">Overview</label>
                    <textarea className="form-control" id="inputOverview" rows="3" name="overview" value={inputMovie.overview} onChange={handlingChange} placeholder="Enter overview"></textarea>
                </div>
                <div className="form-group">
                    <label for="inputPosterPath">Poster Path</label>
                    <input type="text" className="form-control" id="inputPosterPath" name="poster_path" value={inputMovie.poster_path} onChange={handlingChange} placeholder="Enter Poster URL" />
                </div>
                <div className="form-group">
                    <label for="inputPopularity">Popularity</label>
                    <input type="number" step="0.1" max="5" min="0" className="form-control" name="popularity" id="inputPopularity" value={inputMovie.popularity} onChange={handlingChange} placeholder="Enter Popularity Rating (0-5)" />
                </div>
                <div className="form-group">
                    <label for="inputTags">Tags</label>
                    <input type="text" className="form-control" id="inputTags" name="tags" value={inputMovie.tags} onChange={handlingChange} aria-describedby="tagsHelp" placeholder="Enter tags" />
                    <small id="tagsHelp" className="form-text text-muted">Example Tags Format: crime, drama, adventure</small>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </div>
    )
}
