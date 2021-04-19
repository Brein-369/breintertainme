const MovieModel = require('../models/movieModel')


class MovieCont {

    static getAllMovies(req,res,next){
        MovieModel.findAll()
        .then(data=>{
            console.log('masuk, controller get all movie orches');
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

}

module.exports = MovieCont