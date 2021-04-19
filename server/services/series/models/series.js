const {getDatabase} = require('../config/mongodb')
const  {ObjectId} =require('mongodb')
const Redis = require('ioredis')
const redis = new Redis()
const collectionName = 'Series'


class SeriesModel {

    static async find(){
        try {
            const seriesDataRedis = await redis.get('series:data')
            console.log(seriesDataRedis,"line 13<<<");
            if(!seriesDataRedis){
                const allSeriesFromMongoDB = await getDatabase().collection(collectionName).find().toArray()
                console.log(allSeriesFromMongoDB, '<<< data from mongodb');
                return redis.set('series:data', JSON.stringify(allSeriesFromMongoDB))
                .then((data)=>{
                    console.log(data, "set redis success");
                    console.log(allSeriesFromMongoDB, 'then redis');
                    // redis tidak mengembalikan data hasil set nya, yang di return hanya "OK"
                    return allSeriesFromMongoDB
                })
                .catch(err=>{
                    console.log('masuk catch error set redis');
                    return err
                })
            }
            else{
                console.log('cache findall service model series sudah ada');
                return JSON.parse(seriesDataRedis)
            }
        } catch (error) {
            return error
        }

        // awal tanpa redis
        // return getDatabase().collection(collectionName)
        // .find().toArray()
    }

    static async getOne(id){
        try {
            const seriesDataRedis = await redis.get('series:data')
            console.log(seriesDataRedis,"line 13<<<");
            if(!seriesDataRedis){
                const allSeriesFromMongoDB = await getDatabase().collection(collectionName).find().toArray()
                console.log(allSeriesFromMongoDB, '<<< data from mongodb');
                return redis.set('series:data', JSON.stringify(allSeriesFromMongoDB))
                .then((data)=>{
                    console.log(data, "set redis success");
                    console.log(allSeriesFromMongoDB, 'then redis');
                    // redis tidak mengembalikan data hasil set nya, yang di return hanya "OK"
                    return allSeriesFromMongoDB.filter(e=>e._id==id)[0]
                })
                .catch(err=>{
                    console.log('masuk catch error set redis');
                    return err
                })
            }
            else{
                console.log('cache findall service model series sudah ada');
                return JSON.parse(seriesDataRedis).filter(e=>e._id===id)[0]
            }
        } catch (error) {
            return error
        }
        // return getDatabase().collection(collectionName)
        // .findOne({_id : ObjectId(id)})
    }

    static async createOne(payload){
        try {
            await redis.del('series:data')
            return getDatabase().collection(collectionName)
            .insertOne(payload)
        } catch (error) {
            return error
        }
    }

    static async updateOne(id, payload){
        try {
            await redis.del('series:data')
            return getDatabase().collection(collectionName)
            .updateOne(
                {_id : ObjectId(id)},
                {
                    $set: payload
                }
            )
        } catch (error) {
            return error
        }
    }
    static async deleteOne(id){
        try {
            await redis.del('series:data')
            return getDatabase().collection(collectionName)
            .deleteOne({_id : ObjectId(id)})
        } catch (error) {
            return error
        }
    }
}

module.exports = SeriesModel