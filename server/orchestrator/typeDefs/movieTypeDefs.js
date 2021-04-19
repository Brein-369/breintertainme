//type def mirip model di sequlize bisa jadi sebagai validasi bentuk model dari resolver juga
const { gql } = require('apollo-server');
module.exports = gql`

  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    movies: [Movie]
    getOneMovies(id : ID): Movie
  }

  input OneMovie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

 
  input OneMoviePlusId {
    id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

 

  extend type Mutation {
      addMovie(post:OneMovie): Movie
      updateMovie(put:OneMoviePlusId): Message
      deleteMovie(id:ID): Message
  }
`;