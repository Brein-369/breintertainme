const Series = require('../models/series')

class SeriesController {

    static getAll(req, res, next) {
        Series.find()
            .then(data => {
                console.log(data,"<<< data di controller get all series service");
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err);
            })
    }
    static getOne(req, res, next) {
        // res.send('getall Series')
        console.log(req.params.id);
        Series.getOne(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    static createOne(req, res, next){
        console.log(req.body);
        if(req.body.tags){
            let tagsToArray = req.body.tags.split(',')
            tagsToArray = tagsToArray.map(e => e.trim())
            req.body.tags = tagsToArray 
        }
        Series.createOne(req.body)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            console.log(err);
        })
    }


    static updateOne(req, res, next) {
        // res.send('getall Series')
        console.log(req.params.id);
        console.log(req.body);
        if (req.body.tags) {
            let tagsToArray = req.body.tags.split(',')
            tagsToArray = tagsToArray.map(e => e.trim())
            req.body.tags = tagsToArray
        }
        Series.updateOne(req.params.id, req.body)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    static deleteOne(req, res, next) {
        // res.send('getall Series')
        console.log(req.params.id);
        Series.deleteOne(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err);
            })
    }

}

module.exports = SeriesController