const { ApolloServer, gql } = require('apollo-server')
const _ = require('lodash');
const movieTypeDefs = require('./typeDefs/movieTypeDefs')
const seriesTypeDefs = require( './typeDefs/seriesTypeDefs')
const movieResolvers = require( './resolvers/movieResolvers')
const seriesResolvers = require( './resolvers/seriesResolvers')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against<<<<<<<<<<<<<<<<<<<
// your data.

//ga ditulis gql juga masih bisa
//type def mirip model di sequlize bisa jadi sebagai validasi bentuk model dari resolver juga
// const typeDefs = gql`

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< batas data yang belum modular
//   type Movie {
//     _id: ID
//     title: String
//     overview: String
//     poster_path: String
//     popularity: Float
//     tags: [String]
//   }

//   type Series {
//     _id: ID
//     title: String
//     overview: String
//     poster_path: String
//     popularity: Float
//     tags: [String]
//   }


//   type Query {
//     movies: [Movie]
//     getOneMovies(id : ID): Movie
//     series: [Series]
//     getOneSeries(id : ID): Series
//   }

//   input OneMovie {
//     title: String
//     overview: String
//     poster_path: String
//     popularity: Float
//     tags: String
//   }

//   input OneSeries {
//     title: String
//     overview: String
//     poster_path: String
//     popularity: Float
//     tags: String
//   }

//   input OneMoviePlusId {
//     id: ID
//     title: String
//     overview: String
//     poster_path: String
//     popularity: Float
//     tags: String
//   }

//   input OneSeriesPlusId {
//     id: ID
//     title: String
//     overview: String
//     poster_path: String
//     popularity: Float
//     tags: String
//   }

//   type Message {
//       message: String
//   }

//   type Mutation {
//       addMovie(post:OneMovie): Movie
//       addSerie(post:OneSeries): Series
//       updateMovie(put:OneMoviePlusId): Message
//       updateSerie(put:OneSeriesPlusId): Message
//       deleteMovie(id:ID): Message
//       deleteSerie(id:ID): Message
//   }
// `;

// const moviesRoute = 'http://localhost:4001/movies'
// const seriesRoute = 'http://localhost:4002/series'

// const resolvers = {
//     Query: {
//         movies: () => {
//             return axios.get(`http://localhost:4001/${moviesRoute}`)
//             .then(response=>{
//                 return response.data
//             })
//             .catch(err=>{
//                 return err.response.data
//             })
//         },
//         getOneMovies: (parent,args, context, info)=>{
//             console.log(args);
//             const {id} = args
//             return axios({
//                 url: `http://localhost:4001/${moviesRoute}/${id}`,
//                 method: "get"
//             })
//             .then(response=>{
//                 return response.data
//             })
//             .catch(err=>{
//                 return err.response.data
//             })
//         },
//         series: () => {
//             return axios.get(`http://localhost:4002/${seriesRoute}`)
//             .then(response=>{
//                 return response.data
//             })
//             .catch(err=>{
//                 return err.response.data
//             })
//         },
//         getOneSeries: (parent, args, context, info) => {
//             const {id} = args
//             return axios({
//                 url: `http://localhost:4002/${seriesRoute}/${id}`,
//                 method: "get"
//             })            
//             .then(response=>{
//                 return response.data
//             })
//             .catch(err=>{
//                 return err.response.data
//             })
//         },
//     },
//     Mutation:{
//         addMovie: (parent, args, context, info)=>{
//             console.log(args.post,"<<< args.post add movies");
//             const OneMovie = {
//                 title: args.post.title,
//                 overview: args.post.overview,
//                 poster_path: args.post.poster_path,
//                 popularity: args.post.popularity,
//                 tags: args.post.tags
//             }
//             return axios({
//                 url:`${moviesRoute}`,
//                 method: 'post',
//                 data: OneMovie
//             })
//             .then(response=>{
//                 console.log(response.data.ops[0], "<<< response.data axios create data");
//                 return response.data.ops[0]
//             })
//             .catch(err=>{
//                 return err.response.data
//             })
//         },
//         addSerie: (parent, args, context, info)=>{
//             console.log(args.post,"<<< args.post add series");
//             const OneSeries = {
//                 title: args.post.title,
//                 overview: args.post.overview,
//                 poster_path: args.post.poster_path,
//                 popularity: args.post.popularity,
//                 tags: args.post.tags
//             }
//             return axios({
//                 url:`${seriesRoute}`,
//                 method: 'post',
//                 data: OneSeries
//             })
//             .then(response=>{
//                 console.log(response.data.ops[0], "<<< response.data axios create data");
//                 return response.data.ops[0]
//             })
//             .catch(err=>{
//                 return err.response.data
//             })
//         },
//         updateMovie: (parent, args, context, info)=>{
//             console.log(args.put.id,'<<< id put movie');
//             return axios({
//                 url: `${moviesRoute}/${args.put.id}`,
//                 method: "put",
//                 data:{
//                     title: args.put.title,
//                     overview: args.put.overview,
//                     poster_path: args.put.poster_path,
//                     popularity: args.put.popularity,
//                     tags: args.put.tags
//                 }
//             })
//             .then(response=>{
//                 if(response.data.result.ok){
//                     return {message:"Update Movie Success"}
//                 }
//             })
//             .catch(err=>{
//                 return err.response.data
//             })
//         },
//         updateSerie: (parent, args, context, info)=>{
//             console.log(args.put.id,'<<< id put series');
//             return axios({
//                 url: `${seriesRoute}/${args.put.id}`,
//                 method: "put",
//                 data:{
//                     title: args.put.title,
//                     overview: args.put.overview,
//                     poster_path: args.put.poster_path,
//                     popularity: args.put.popularity,
//                     tags: args.put.tags
//                 }
//             })
//             .then(response=>{
//                 if(response.data.result.ok){
//                     return {message:"Update Series Success"}
//                 }
//             })
//             .catch(err=>{
//                 return err.response.data
//             })
//         },
//         deleteMovie: (_,args)=>{
//             return axios({
//                 url: `${moviesRoute}/${args.id}`,
//                 method:"delete"
//             })
//             .then(response=>{
//                 if(response.data.result.ok){
//                     return {message: "Movie Deletion Success"}
//                 }
//             })
//             .catch(err=>{
//                 return err.response.data
//             })
//         },
//         deleteSerie: (_,args)=>{
//             return axios({
//                 url: `${seriesRoute}/${args.id}`,
//                 method:"delete"
//             })
//             .then(response=>{
//                 if(response.data.result.ok){
//                     return {message: "Series Deletion Success"}
//                 }
//             })
//             .catch(err=>{
//                 return err.response.data
//             })
//         }
//     }
// };
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< batas data yang belum modular

const baseTypeDefs = gql`
  type Query

  type Mutation

  type Message {
    message: String
}
`

const server = new ApolloServer({ 
    typeDefs: [baseTypeDefs, movieTypeDefs, seriesTypeDefs],
    resolvers : _.merge({}, movieResolvers, seriesResolvers)
});

const port = {port: process.env.PORT || 4000 }
// The `listen` method launches a web server.
server.listen(port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

