const express = require('express')
const app = express()
const port = process.env.PORT || 4002
const allSeriesRoutes = require('./routes/index')
const {connectMongodb} = require('./config/mongodb')


connectMongodb(connectionBoolean =>{
    if(connectionBoolean){
        console.log('connection mongodb success');
    }
    else{
        console.log('connection mongodb failed');
    }
})
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/series',allSeriesRoutes)

app.listen(port, ()=>{
    console.log('app series listening on port' + port);
})