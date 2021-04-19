const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis(); 

const urlSeriesService = 'http://localhost:4002/series/'


class SeriesModel {

    static async findAll(){
        try {
            const seriesData = await redis.get('series:data')
            if(!seriesData){
                return axios.get(urlSeriesService)
                .then(response=>{
                    return redis.set('series:data', JSON.stringify(response.data))
                    .then(res=>{
                        console.log(res, 'response redis di findall series model');
                        return response.data
                    })
                    .catch(err=>{
                        console.log(err, 'error dari redis findall series model');
                    })
                })
                .catch(err=>{
                    return err.response
                })
            }
            else{
                console.log('ada cache all series');
                return JSON.parse(seriesData)
            }
        } catch (error) {
            return error
        }
    }

}

module.exports = SeriesModel