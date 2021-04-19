const SeriesModel = require('../models/seriesModel')


class SeriesCont {

    static getAllSeries(req,res,next){
        SeriesModel.findAll()
        .then(data=>{
            console.log('masuk, controller get all series orches');
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

}

module.exports = SeriesCont