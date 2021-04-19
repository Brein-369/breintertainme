const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const allMovieRoutes = require('./routes/index')
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
app.use('/movies',allMovieRoutes)

app.listen(port, ()=>{
    console.log('app movies listening on port' + port);
})