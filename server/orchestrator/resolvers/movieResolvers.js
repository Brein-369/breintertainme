const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const moviesRoute = 'http://localhost:4001/movies'

module.exports = {
    Query: {
        movies: async () => {
            try {
                const allMovieRedis = await redis.get("movies:data")
                if(!allMovieRedis){
                    return axios.get(`${moviesRoute}`)
                    .then(response=>{
                        const axiosResponse = response.data
                        // kayanya ga perlu di set redis disini lagi....
                        return redis.set('movies:data', JSON.stringify(axiosResponse))
                        .then(_=>{
                            return axiosResponse
                        })
                        .catch(err=>{
                            console.log(err);
                            return err
                        })
                    })
                    .catch(err=>{
                        return err.response.data
                    })
                }
                else{
                    return JSON.parse(allMovieRedis)
                }
                
            } catch (error) {
                console.log(error);
                return error
            }
        },
        getOneMovies: async (parent,args, context, info)=>{
            try {
                const allRedisMovie = await redis.get('movies:data')
                if(!allRedisMovie){
                    console.log(args);
                    const {id} = args
                    return axios({
                        url: `${moviesRoute}/${id}`,
                        method: "get"
                    })
                    .then(response=>{
                        const axiosResponse  = response.data
                        return axiosResponse
                    })
                    .catch(err=>{
                        return err.response.data
                    })
                }
                else{
                    return JSON.parse(allRedisMovie).filter(e=>e._id==args.id)[0]
                }
            } catch (error) {
                console.log(error);
                return error
            }
        }
    },
    Mutation:{
        addMovie: (parent, args, context, info)=>{
            console.log(args.post,"<<< args.post add movies");
            const OneMovie = {
                title: args.post.title,
                overview: args.post.overview,
                poster_path: args.post.poster_path,
                popularity: args.post.popularity,
                tags: args.post.tags
            }
            return axios({
                url:`${moviesRoute}`,
                method: 'post',
                data: OneMovie
            })
            .then(response=>{
                console.log(response.data.ops[0], "<<< response.data axios create data");
                const axiosResponse = response.data.ops[0]
                // kayanya ga perlu del juga disini..
                return redis.del('movies:data')
                .then(_=>{
                    return axiosResponse
                })
                .catch(err=>{
                    console.log(err);
                    return err
                })
            })
            .catch(err=>{
                return err.response.data
            })
        },
        updateMovie: (parent, args, context, info)=>{
            console.log(args.put.id,'<<< id put movie');
            return axios({
                url: `${moviesRoute}/${args.put.id}`,
                method: "put",
                data:{
                    title: args.put.title,
                    overview: args.put.overview,
                    poster_path: args.put.poster_path,
                    popularity: args.put.popularity,
                    tags: args.put.tags
                }
            })
            .then(response=>{
                if(response.data.result.ok){
                    // kayanya ga perlu del juga disini..
                    return redis.del('movies:data')
                    .then(_=>{
                        return {message:"Update Movie Success"}
                    })
                    .catch(err=>{
                        console.log(err);
                        return err
                    })
                }
            })
            .catch(err=>{
                return err.response.data
            })
        },
        deleteMovie: (_,args)=>{
            return axios({
                url: `${moviesRoute}/${args.id}`,
                method:"delete"
            })
            .then(response=>{
                if(response.data.result.ok){
                    // kayanya ga perlu del juga disini..
                    return redis.del('movies:data')
                    .then(_=>{
                        return {message: "Movie Deletion Success"}
                    })
                    .catch(err=>{
                        console.log(err);
                        return err
                    })
                }
            })
            .catch(err=>{
                return err.response.data
            })
        }
    }
};