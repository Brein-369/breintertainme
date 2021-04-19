const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis(); 

const urlMovieService = 'http://localhost:4001/movies/'


class MovieModel {

    static async findAll(){
        try {
            const movieData = await redis.get('movies:data')
            if(!movieData){
                return axios.get(urlMovieService)
                .then(response=>{
                    return redis.set('movies:data', JSON.stringify(response.data))
                    .then(res=>{
                        console.log(res, 'response redis di findall movies model');
                        return response.data
                    })
                    .catch(err=>{
                        console.log(err, 'error dari redis findall movies model');
                    })
                })
                .catch(err=>{
                    return err.response
                })
            }
            else{
                console.log('ada cache all movie');
                return JSON.parse(movieData)
            }
        } catch (error) {
            return error
        }
    }

}

module.exports = MovieModel