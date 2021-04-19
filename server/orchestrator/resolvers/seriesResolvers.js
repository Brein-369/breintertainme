const axios = require('axios')
const seriesRoute = 'http://localhost:4002/series'
const Redis = require('ioredis')
const redis = new Redis()
module.exports ={
    Query: {
        series: async () => {
            try {
                const allRedisSeries = await redis.get('series:data')
                if(!allRedisSeries){
                    return axios.get(`${seriesRoute}`)
                    .then(response=>{
                        console.log(response.data, 'res data axios orches all series');
                        const axiosResponse = response.data
                        // kayanya ga perlu di set redis disini lagi....
                        return redis.set('series:data', JSON.stringify(axiosResponse))
                        .then(_=>{
                            console.log('mask then redis set orhces series');
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
                    console.log('ada cache all series orches');
                    return JSON.parse(allRedisSeries)
                }
            } catch (error) {
                return error
            }
        },
        getOneSeries: async (parent, args, context, info) => {
            try {
                const allRedisSeries = await redis.get('series:data')
                if(!allRedisSeries){
                    const {id} = args
                    return axios({
                        url: `${seriesRoute}/${id}`,
                        method: "get"
                    })            
                    .then(response=>{
                        const axiosResponse = response.data
                        return axiosResponse
                    })
                    .catch(err=>{
                        return err.response.data
                    })
                }
                else{
                    console.log('cache ada, di get one series orches');
                    return JSON.parse(allRedisSeries).filter(e=>e._id==args.id)[0]
                }
            } catch (error) {
                return error
            }
        },
    },
    Mutation:{
        addSerie: (parent, args, context, info)=>{
            console.log(args.post,"<<< args.post add series");
            const OneSeries = {
                title: args.post.title,
                overview: args.post.overview,
                poster_path: args.post.poster_path,
                popularity: args.post.popularity,
                tags: args.post.tags
            }
            return axios({
                url:`${seriesRoute}`,
                method: 'post',
                data: OneSeries
            })
            .then(response=>{
                console.log(response.data.ops[0], "<<< response.data axios create data");
                const axiosResponse= response.data.ops[0]
                // kayanya ga perlu del juga disini..
                return redis.del('series:data')
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
        updateSerie: (parent, args, context, info)=>{
            console.log(args.put.id,'<<< id put series');
            return axios({
                url: `${seriesRoute}/${args.put.id}`,
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
                    return redis.del('series:data')
                    .then(_=>{
                        return {message:"Update Series Success"}
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
        deleteSerie: (_,args)=>{
            return axios({
                url: `${seriesRoute}/${args.id}`,
                method:"delete"
            })
            .then(response=>{
                if(response.data.result.ok){
                    // kayanya ga perlu del juga disini..
                    return redis.del('series:data')
                    .then(_=>{
                        return {message: "Series Deletion Success"}
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