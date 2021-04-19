const express = require('express')
const app = express()
const {connectMongodb, getDatabase} = require('./config/mongodb')

const port = 3000

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

app.get('/movies', (req,res)=>{
    console.log(getDatabase());
    getDatabase().collection('Movies').find().toArray()
    .then(data=>{
        res.status(200).json({data})
    })
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})