const { MongoClient } = require('mongodb')


let database = null

function connectMongodb(cb) {
    const uri = 'mongodb://localhost:27017'
    // jgn lupa ganti password dan myfirstdatabase bawaan abis copas dari web atlas
    const uriAtlas = "mongodb+srv://admin:admin@cluster0.jun7l.mongodb.net/entertainme?retryWrites=true&w=majority"
    
    const client = new MongoClient(uriAtlas, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    //connectingnya
    client.connect()
        .then(_ => {
            cb(true)
            
            database = client.db('entertainme')

            //querynya
            // database.collection('entertainme').find().toArray()
            //     .then(data => {
            //         console.log(data);
            //     })
            //     .catch(err=>{
            //         console.log(err, 'error query find');
            //     })
        })
        .catch(err=>{
            cb(false)
            console.log(err, 'connection mongodb failed');
        })
}

function getDatabase(){
    return database
}


module.exports = {
    connectMongodb,
    getDatabase

}