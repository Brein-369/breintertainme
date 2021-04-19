const {getDatabase} = require('../config/mongodb')
const  {ObjectId} =require('mongodb')
const Redis = require('ioredis')
const redis = new Redis()
const collectionName = 'Movies'


class MovieModel {

    static async find(){
        try {
            const moviesDataRedis = await redis.get('movies:data')
            console.log(moviesDataRedis,"line 13<<<");
            if(!moviesDataRedis){
                const allMoviesFromMongoDB = await getDatabase().collection(collectionName).find().toArray()
                return redis.set('movies:data', JSON.stringify(allMoviesFromMongoDB))
                .then((data)=>{
                    console.log(data, "set redis success");
                    console.log(allMoviesFromMongoDB, 'then redis');
                    // redis tidak mengembalikan data hasil set nya, yang di return hanya "OK"
                    return allMoviesFromMongoDB
                })
                .catch(err=>{
                    console.log('masuk catch error set redis');
                    return err
                })
            }
            else{
                console.log(moviesDataRedis, '<<< cache findall service model movies sudah ada');
                return JSON.parse(moviesDataRedis)
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
            const moviesDataRedis = await redis.get('movies:data')
            console.log(moviesDataRedis,"line 44<<<");
            if(!moviesDataRedis){
                const allMoviesFromMongoDB = await getDatabase().collection(collectionName).find().toArray()
                return redis.set('movies:data', JSON.stringify(allMoviesFromMongoDB))
                .then((data)=>{
                    console.log(data, "set redis success");
                    console.log(allMoviesFromMongoDB, 'then redis');
                    // redis tidak mengembalikan data hasil set nya, yang di return hanya "OK"
                    const oneMovie = allMoviesFromMongoDB.filter(e=>e._id==id)
                    console.log(oneMovie,'<<< one movie baru set redis model movie service get one');
                    return oneMovie[0]
                })
                .catch(err=>{
                    console.log('masuk catch error set redis');
                    return err
                })
            }
            else{
                console.log('cache findall service model movies sudah ada');
                const parsedData = JSON.parse(moviesDataRedis).filter(e=>e._id===id)
                console.log(parsedData,"<<< parsed data get one model movie service");
                return parsedData[0]
            }
        } catch (error) {
            return error
        }

//         return getDatabase().collection(collectionName)
// .findOne({_id : ObjectId(id)})
        

    }

    static async createOne(payload){
        try {
            await redis.del('movies:data')
            return getDatabase().collection(collectionName)
            .insertOne(payload)
        } catch (error) {
            return error
        }
    }

    static async updateOne(id, payload){
        try {
            await redis.del('movies:data')
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
            await redis.del('movies:data')
            return getDatabase().collection(collectionName)
            .deleteOne({_id : ObjectId(id)})
        } catch (error) {
            return error
        }
    }
}

module.exports = MovieModel