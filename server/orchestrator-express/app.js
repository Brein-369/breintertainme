const express= require('express')
const app = express()
const port = 4000

const allRoutes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/entertainme',allRoutes)


app.listen(port, ()=>{
    console.log('orchestrator listening on port', port);
})