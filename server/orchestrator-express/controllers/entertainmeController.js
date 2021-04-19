const MovieModel = require('../models/movieModel')
const SeriesModel = require('../models/seriesModel')

class EntertainmeCont {

    static getAllDataEntertainme(req,res,next){
        Promise.all([MovieModel.findAll(), SeriesModel.findAll()])
        .then((values) => {
            console.log(values,'values dari promise all')
            res.status(200).json(values)

        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

}

module.exports = EntertainmeCont