import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
        query {
            movies{
                _id
                title
                overview
                poster_path
                popularity
                tags
            }
            series{
                _id
                title
                overview
                poster_path
                popularity
                tags
            }
        }
    `

export const ADD_MOVIE = gql`
mutation AddM($inputData:OneMovie){
    addMovie(post:$inputData){
        title
        overview
        poster_path
        popularity
        tags
    }
}
`

export const DELETE_MOVIE = gql`
    mutation DelM ($theID:ID){
        deleteMovie(id:$theID){
            message
        }
    }
    `
export const GET_ONE_MOVIE = gql`
query GetOne($theID:ID){
    getOneMovies(id:$theID){
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
}
`
export const UPDATE_MOVIE = gql`
        mutation UpdateM($inputData:OneMoviePlusId){
            updateMovie(put:$inputData){
                message
            }
        }
    `