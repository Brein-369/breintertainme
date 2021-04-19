const Movies = require('../models/movies')

class MovieController {

    static getAll(req, res, next) {
        Movies.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err);
            })
    }
    static getOne(req, res, next) {
        // res.send('getall movies')
        console.log(req.params.id);
        Movies.getOne(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    static createOne(req, res, next){
        console.log(req.body,'<<< masuk create one movies service');
        if(req.body.tags){
            let tagsToArray = req.body.tags.split(',')
            tagsToArray = tagsToArray.map(e => e.trim())
            req.body.tags = tagsToArray 
        }
        Movies.createOne(req.body)
        .then(data=>{
            // return data
            console.log(data);
            res.status(201).json(data)
        })
        .catch(err=>{
            console.log(err);
        })
    }


    static updateOne(req, res, next) {
        // res.send('getall movies')
        console.log(req.params.id);
        console.log(req.body);
        if (req.body.tags) {
            let tagsToArray = req.body.tags.split(',')
            tagsToArray = tagsToArray.map(e => e.trim())
            req.body.tags = tagsToArray
        }
        Movies.updateOne(req.params.id, req.body)
            .then(data => {
                console.log(data, "<<< data update movie di controller movie service");
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    static deleteOne(req, res, next) {
        // res.send('getall movies')
        console.log(req.params.id);
        Movies.deleteOne(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err);
            })
    }

}

module.exports = MovieController